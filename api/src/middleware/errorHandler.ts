import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // log for debugging

  if (err.status && err.message) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.errors && { details: err.errors }),
    });
  }

  // fallback for unhandled errors
  res.status(500).json({ error: "Internal Server Error" });
};
