import { configureStore } from "@reduxjs/toolkit";
import subjectSlice from "../features/subjectSlice";
import { SubjectApi } from "../services/api/SubjectService";

export const store = configureStore({
  reducer: {
    subject: subjectSlice,

    [SubjectApi.reducerPath]: SubjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([SubjectApi.middleware]),
});
