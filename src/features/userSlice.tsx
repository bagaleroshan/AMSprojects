import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../component/user/UserInterface";

const initialState: IUser = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
