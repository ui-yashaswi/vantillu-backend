import { z } from "zod";

const loginSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email format"),
});

// Example usage of safeParse
export const validateAuth = (userData) => {
  const result = loginSchema.safeParse(userData);
  if (!result.success) {
    console.error("Validation failed:", result.error.format());
    return { success: false, errors: result.error.format() };
  }
  return { success: true, data: result.data };
};
