import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../component/interfaces/UserInterface";

const initialState: IUser = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "",
  token: "",
  adminToken: "",
  teachersToken: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    clearToken: (state) => {
      state.token = null;
    },

    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.role = "";
      localStorage.clear();
    },
  },
});

export const { setToken, clearToken, logout, setRole } = userSlice.actions;

export default userSlice.reducer;
