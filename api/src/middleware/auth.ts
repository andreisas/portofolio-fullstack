import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

export const authenticate: RequestHandler = (req, _res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.get("Authorization")?.startsWith("Bearer ")
        ? req.get("Authorization")?.split(" ")[1]
        : undefined);
    if (!token) return next({ status: 401, message: "Not authenticated" });
    const secret = process.env.JWT_SECRET as string;
    if (!secret)
      return next({ status: 500, message: "Server misconfiguration" });
    const payload = jwt.verify(token, secret) as JwtPayload;
    // attach user payload to req for downstream handlers
    req.user = payload;
    return next();
  } catch (err) {
    return next({ status: 401, message: "Invalid or expired token" });
  }
};

export const requireAdmin: RequestHandler = (req, _res, next) => {
  const user = req.user as JwtPayload | undefined;
  if (!user) return next({ status: 401, message: "Not authenticated" });
  if (user.role !== "ADMIN")
    return next({ status: 403, message: "Admin required" });
  return next();
};

export default { authenticate, requireAdmin };
