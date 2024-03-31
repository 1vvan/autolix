import { IUser } from "@/shared/types/IUser";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    id: 0,
    name: "",
    nickname: "",
    photo: "",
    lang: "",
    email: "",
    email_verified_at: "",
    created_at: "",
    updated_at: "",
  },
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
