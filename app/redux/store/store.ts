"use client"

// store.ts
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/authSlice"
import cartReducer from "../features/cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart:cartReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
