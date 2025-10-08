import { RequestHandler } from "express";
import z from "zod";

// validateBody(schema) returns middleware that validates req.body with the provided Zod schema
export function validateBody(schema: z.ZodTypeAny): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return next({ status: 400, message: "Invalid data", errors });
    }
    // replace body with the parsed/validated data
    req.body = result.data as any;
    return next();
  };
}

export default validateBody;
