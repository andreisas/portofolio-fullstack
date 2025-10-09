import { RequestHandler } from "express";
import z from "zod";

// validateBody(schema) returns middleware that validates req.body with the provided Zod schema
export function validateBody<T extends z.ZodTypeAny>(
  schema: T
): RequestHandler<any, any, z.infer<T>> {
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
    req.body = result.data;
    return next();
  };
}

export default validateBody;
