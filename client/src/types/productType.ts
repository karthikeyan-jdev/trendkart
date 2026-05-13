export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string ;
  id: number ;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];

  category: Category;

  creationAt: string;
  updatedAt: string;
}