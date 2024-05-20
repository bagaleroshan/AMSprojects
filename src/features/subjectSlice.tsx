import { createSlice } from "@reduxjs/toolkit";

interface SubjectState {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}

const initialState: SubjectState = {
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
