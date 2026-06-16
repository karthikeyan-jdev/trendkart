import type { CartItem } from "./cartType";

export type CreatePaymentPayload = {
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  totalAmount: number;
};

export type CreatePaymentResponse = {
  order: {
    _id: string;
  };
};
