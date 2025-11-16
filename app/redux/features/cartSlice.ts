"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =======================
// Types
// =======================
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

interface CartState {
  items: CartItem[];
}

// =======================
// LocalStorage Helpers
// =======================
const CART_KEY = "cart";

const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
      return [];
    }
  }
  return [];
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
};

// =======================
// Initial State
// =======================
const initialState: CartState = {
  items: loadCart(),
};

// =======================
// Slice
// =======================
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set entire cart (used when loading from storage)
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCart(state.items);
    },

    // Add item to cart
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += action.payload.qty || 1; // Increase qty
      } else {
        state.items.push({ ...action.payload, qty: action.payload.qty || 1 });
      }
      saveCart(state.items);
    },

    // Remove item by id
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },

    // Update item quantity
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.qty > 0) {
        item.qty = action.payload.qty;
      }
      saveCart(state.items);
    },

    // Clear cart
    clearCart(state) {
      state.items = [];
      localStorage.removeItem(CART_KEY);
    },
  },
});

// =======================
// Selectors
// =======================
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
