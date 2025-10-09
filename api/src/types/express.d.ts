declare global {
  namespace Express {
    interface Request {
      // reuse the JwtPayload shape from src/types/auth.ts
      user?: import("../types/auth").JwtPayload;
    }
  }
}

export {};
