import { IUser } from "@/shared/types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutUser(state) {
      state.user = null;
      state.error = null;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.userReducer.user;

export const selectIsAdmin = (state: RootState) => state.userReducer.user?.is_admin || false;

export const { startLoading, setUser, setError, logoutUser } = userSlice.actions;

export default userSlice.reducer;
