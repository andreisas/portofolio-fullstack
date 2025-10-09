export type JwtPayload = {
  id: number;
  role: "USER" | "ADMIN" | string;
  iat?: number;
  exp?: number;
};
