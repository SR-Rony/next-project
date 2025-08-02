// redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "@/types/user";

// Safe function to get user from localStorage
const getUserFromLocalStorage = (): UserType | null => {
  // Avoid running during SSR
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("user");

  // If value doesn't exist or is invalid
  if (!stored || stored === "undefined" || stored === "null") {
    return null;
  }

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
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;

      // Only store if payload is valid
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
