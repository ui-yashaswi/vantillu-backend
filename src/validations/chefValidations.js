import { z } from "zod";

const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["starters", "maincourse", "drinks", "desserts"]),
  image: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  availability: z.enum(["available", "unavailable"]).default("available"),
  addedBy: z.string().optional(),
});

// Example usage:
export const validateMenu = (data) => {
  const result = menuSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error.format());
  }
  return { result: result.success, data: result.data };
};
