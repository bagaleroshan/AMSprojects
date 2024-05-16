import { configureStore } from "@reduxjs/toolkit";
import { SubjectApi } from "../services/api/SubjectService";
import subjectSlice from "../features/subjectSlice";

export const store = configureStore({
  reducer: {
    subject: subjectSlice,
    [SubjectApi.reducerPath]: SubjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SubjectApi.middleware),
});
