import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../component/user/UserInterface";

const initialState: IUser = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "",
  token: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // setToken: (state) => {
    //   state.token = localStorage.getItem("token");
    // },
    clearToken: (state) => {
      state.token = null;
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
