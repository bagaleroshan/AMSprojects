import { configureStore } from "@reduxjs/toolkit";
import { SubjectApi } from "../services/api/SubjectService";
import subjectSlice from "../features/subjectSlice";
import userSlice from "../features/userSlice";
import { UserApi } from "../services/api/userService";

export const store = configureStore({
  reducer: {
    subject: subjectSlice,
    [SubjectApi.reducerPath]: SubjectApi.reducer,
    user: userSlice,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SubjectApi.middleware, UserApi.middleware),
});
