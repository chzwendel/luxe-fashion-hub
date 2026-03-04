import { create } from "zustand";
import { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, size) => {
    const items = get().items;
    const existing = items.find(
      (i) => i.product.id === product.id && i.selectedSize === size
    );
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { product, quantity: 1, selectedSize: size }] });
    }
  },
  removeItem: (productId) =>
    set({ items: get().items.filter((i) => i.product.id !== productId) }),
  updateQuantity: (productId, quantity) =>
    set({
      items:
        quantity <= 0
          ? get().items.filter((i) => i.product.id !== productId)
          : get().items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i
            ),
    }),
  clearCart: () => set({ items: [] }),
  total: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
