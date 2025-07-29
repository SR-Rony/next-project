import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { UserType } from "@/types/user"

type AuthState = {
  user: UserType | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
