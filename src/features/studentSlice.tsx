import { createSlice } from "@reduxjs/toolkit";
import { IStudent } from "../component/interfaces/StudentInterface";

const initialState: IStudent = {
  id: "",
  fullName: "",
  email: "",
  address: "",
  phoneNumber: "",
};

export const studentSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
});

export default studentSlice.reducer;
