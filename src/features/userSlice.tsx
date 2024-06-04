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
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      if (state.role === "admin") {
        state.adminToken = action.payload;
      } else {
        state.teachersToken = action.payload;
      }
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    clearToken: (state) => {
      state.token = "";
      state.adminToken = "";
      state.teachersToken = "";
      localStorage.removeItem("token");
    },

    logout: (state) => {
      state.token = "";
      state.role = "";
      state.adminToken = "";
      state.teachersToken = "";
      localStorage.clear();
    },
  },
});

export const { setToken, clearToken, logout, setRole } = userSlice.actions;

export default userSlice.reducer;
