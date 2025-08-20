"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  image: string
}

const initialState: CartItem[] = []

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      return action.payload
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      // Check if product exists
      const existingIndex = state.findIndex(item => item.id === action.payload.id)
      if (existingIndex !== -1) {
        state[existingIndex].qty += 1
      } else {
        state.push(action.payload)
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const updated = state.filter((item) => item.id !== action.payload)
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updated))
      }
      return updated
    },
    clearCart() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart")
      }
      return []
    },
  },
})

export const { setCart, addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
