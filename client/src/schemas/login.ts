import z from "zod";

// Zod Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type
export type LoginFormDataType = z.infer<typeof loginSchema>;
