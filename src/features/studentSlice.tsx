import { createSlice } from "@reduxjs/toolkit";
import { IStudent } from "../component/studentInterface";

const initialState: IStudent = {
  fullName: "",
  email: "",
  course: "",
  phoneNumber: "",
};

export const studentSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
});

export default studentSlice.reducer;
