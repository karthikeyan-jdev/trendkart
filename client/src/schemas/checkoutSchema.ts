import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(10),
  address: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(6),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
