import { createSlice } from "@reduxjs/toolkit";

interface SubjectState {
  subjectName: string;
  subjectCode: string;
  noOfClasses: number;
}

const initialStateValue: SubjectState = {
  subjectName: "Say MERN",
  subjectCode: "MRN-20",
  noOfClasses: 0,
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState: initialStateValue,
  reducers: {},
});

// export const {} = subjectSlice.actions;

export default subjectSlice.reducer;
