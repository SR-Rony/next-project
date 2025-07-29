"use client"


// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

// Don't access localStorage directly here
const initialState: CartItem[] = []

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      return action.payload
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      state.push(action.payload)
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
  },
})

export const { setCart, addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
