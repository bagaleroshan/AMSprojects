import { createSlice } from "@reduxjs/toolkit";
import { IFeedback } from "../component/interfaces/FeedbackInterface";

const initialState: IFeedback = {
  onTime: 0,
  hasDeliveryPower: 0,
  hasSkills: 0,
  hasInteraction: 0,
  isClassFruitful: 0,
  isClassRoomComfortable: 0,
  hasClearConversation: 0,
  doesInternetWork: 0,
  feelChangeOnYourself: 0,
  description: "",
};

export const feedbackSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
});

export default feedbackSlice.reducer;
