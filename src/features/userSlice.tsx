import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const initialState: IUserState = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetForm() {
      return initialState;
    },
  },
});

export const { resetForm } = userSlice.actions;

export default userSlice.reducer;
