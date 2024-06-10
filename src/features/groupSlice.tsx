import { createSlice } from "@reduxjs/toolkit";
import { IGroup } from "../component/interfaces/GroupInterface";

const initialState: IGroup = {
  id: "",
  subject: "",
  teacher: "",
  groupName: "",
  students: "",
  startTime: "",
  endTime: "",
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
});

export default groupSlice.reducer;
