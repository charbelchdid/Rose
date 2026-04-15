"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shade?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  discountCode: string;
  discountPercent: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string, shade?: string) => void;
  updateQuantity: (id: string, quantity: number, shade?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  total: () => number;
  subtotal: () => number;
  itemCount: () => number;
}

const DISCOUNT_CODES: Record<string, number> = {
  GLOW10: 10,
  BEAUTY20: 20,
  WELCOME15: 15,
  LOVE25: 25,
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: "",
      discountPercent: 0,

      addItem: (item, qty = 1) => {
        set((state) => {
          const key = item.shade ? `${item.id}-${item.shade}` : item.id;
          const existing = state.items.find(
            (i) => (i.shade ? `${i.id}-${i.shade}` : i.id) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                (i.shade ? `${i.id}-${i.shade}` : i.id) === key
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
            isOpen: true,
          };
        });
      },

      removeItem: (id, shade) => {
        set((state) => ({
          items: state.items.filter(
            (i) => (shade ? `${i.id}-${i.shade}` : i.id) !== (shade ? `${id}-${shade}` : id)
          ),
        }));
      },

      updateQuantity: (id, quantity, shade) => {
        if (quantity <= 0) {
          get().removeItem(id, shade);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            (shade ? `${i.id}-${i.shade}` : i.id) === (shade ? `${id}-${shade}` : id)
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], discountCode: "", discountPercent: 0 }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),

      applyDiscount: (code) => {
        const upper = code.toUpperCase().trim();
        const percent = DISCOUNT_CODES[upper];
        if (percent) {
          set({ discountCode: upper, discountPercent: percent });
          return true;
        }
        return false;
      },

      removeDiscount: () => set({ discountCode: "", discountPercent: 0 }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      total: () => {
        const sub = get().subtotal();
        return sub - sub * (get().discountPercent / 100);
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "glamour-cart" }
  )
);
