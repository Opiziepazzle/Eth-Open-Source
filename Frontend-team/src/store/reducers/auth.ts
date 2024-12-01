import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    username: string | null; // New field
    token: string | null; // New field
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set the user state with the provided user data.
     * @param state - The current state of the reducer
     * @param action - The action to set the user state
     */
    setUser(
      state,
      action: PayloadAction<{
        uid: string;
        displayName: string | null;
        email: string | null;
        photoURL: string | null;
        username: string | null;
        token: string | null;
      } | null>
    ) {
      state.user = action.payload;
    },
    /**
     * Set the isLoading state of the reducer with the provided boolean value.
     * @param state - The current state of the reducer
     * @param action - The action to set the isLoading state
     */
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    /**
     * Set the error state with the provided error message.
     * @param state - The current state of the reducer
     * @param action - The action to set the error state
     */
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
