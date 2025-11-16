// redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/user";

// 🧠 LocalStorage থেকে user safely পাওয়া
const getUserFromLocalStorage = (): UserType | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("user");
  if (!stored || stored === "undefined" || stored === "null") return null;

  try {
    return JSON.parse(stored) as UserType;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

type AuthState = {
  user: UserType | null;
};

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ login বা register এ user set করা
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },

    // ✅ logout করলে সব clear
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
