import type { Product } from "./productType";

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}