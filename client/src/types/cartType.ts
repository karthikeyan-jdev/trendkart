import type { Product } from "./productType";

export interface CartItem extends Product {
  quantity: number;
}
