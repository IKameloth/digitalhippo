import { Product } from "@/payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  slug: string;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, slug: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, slug) =>
        set((state) => {
          return { items: [...state.items, { product, slug }] };
        }),
      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
