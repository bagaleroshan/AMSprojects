import { createSlice } from "@reduxjs/toolkit";

interface StudentState {
  fullName: string;
  Email: string;
  course: string;
  phoneNumber: string;
}

const initialState: StudentState = {
  fullName: "",
  Email: "",
  course: "",
  phoneNumber: "",
}
;

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetForm() {
      return initialState;
    },
  },
});

export const { resetForm } = studentSlice.actions;

export default studentSlice.reducer;
