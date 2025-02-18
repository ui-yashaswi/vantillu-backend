import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["staff", "admin", "chef", "user"]).default("user"),
});

// Example usage of safeParse
export const validateUser = (userData) => {
  const result = UserSchema.safeParse(userData);
  if (!result.success) {
    console.error("Validation failed:", result.error.format());
    return { success: false, errors: result.error.format() };
  }
  return { success: true, data: result.data };
};
