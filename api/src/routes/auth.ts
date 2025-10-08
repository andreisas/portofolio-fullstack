import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import validateBody from "../middleware/validate";

const prisma = new PrismaClient();
const router = Router();

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(1, "Password is required"),
});

// POST /auth/register
router.post(
  "/register",
  validateBody(registerSchema),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };

      // check if user already exists
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return next({ status: 409, message: "Email already in use" });
      }

      // hash password
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, passwordHash },
      });

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({ user: safeUser });
    } catch (err) {
      next(err);
    }
  }
);

// POST /auth/login
router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next({ status: 401, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash || "");
    if (!match) return next({ status: 401, message: "Invalid credentials" });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Set cookie (for local dev: secure=false)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev so Postman/browser can receive it on http
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // send back safe user data (omit passwordHash)
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.json({ user: safeUser });
  } catch (err) {
    next(err);
  }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  // respond with 204 No Content to indicate successful logout
  res.status(204).send();
});

export default router;
