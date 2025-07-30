// redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { UserType } from "@/types/user"

const getUserFromLocalStorage = (): UserType | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

type AuthState = {
  user: UserType | null
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("user")
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
