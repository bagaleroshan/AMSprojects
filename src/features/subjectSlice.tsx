import { createSlice } from "@reduxjs/toolkit";
import { ISubject } from "../component/interfaces/SubjectInterface";

const initialState: ISubject = {
  subjectName: "",
  subjectCode: "",
  numberOfClasses: 0,
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
});

// export const { resetForm } = subjectSlice.actions;

export default subjectSlice.reducer;
