import { z } from "zod";

export const bookCateringValidation = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email format"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
  message: z.string().optional(),
});
