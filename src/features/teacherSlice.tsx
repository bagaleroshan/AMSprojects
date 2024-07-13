import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../component/interfaces/UserInterface";

const initialState: IUser = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "teacher",
  token: "",
  teachersToken: "",
};

export const teacherSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default teacherSlice.reducer;
