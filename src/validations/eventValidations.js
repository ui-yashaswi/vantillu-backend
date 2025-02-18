import { z } from "zod";

const bookEventValidation = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  time: z.string(),
  contact: z.string().min(10).max(15, "Contact number must be valid"),
  location: z.string().min(3, "Location must be at least 3 characters long"),
  eventDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  people: z.number().min(1, "At least 1 person is required"),
  message: z.string().optional(),
});

export default bookEventValidation;
