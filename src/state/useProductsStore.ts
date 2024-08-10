import { create } from "zustand";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

export default useProductsStore;
