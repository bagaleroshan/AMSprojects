import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAttendance } from "../component/interfaces/AttendanceInterface";

const initialState: IAttendance = {
  date: "",
  attendance: [],
};

export const attendanceSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    storeAttendance: (state, action: PayloadAction<{ data: IAttendance }>) => {
      const { data } = action.payload;
      state.date = data.date;
      state.attendance = data.attendance;
    },
  },
});

export const { storeAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
