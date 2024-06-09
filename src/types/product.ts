// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
  }
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductContextState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  fetchProductById: (id: number) => Promise<Product | undefined>;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void; // Updated type
  resetFilters: () => void;
  setSortMethod: (method: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  minPrice:number,
  maxPrice: number,
}


export type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' };

export interface ProductState {
  products: Product[];
  cart: CartItem[];
}
