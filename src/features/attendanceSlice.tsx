import { createSlice } from "@reduxjs/toolkit";
import { IAttendance } from "../component/interfaces/AttendanceInterface";

const initialState: IAttendance = {
  date:"",
  attendance:{
    student:"",
    present:""
  }
};

export const attendanceSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
});

export default attendanceSlice.reducer;
