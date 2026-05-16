import z from "zod";

// Zod Schema
export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type from schema
export type SignupFormDataType = z.infer<typeof signupSchema>;
