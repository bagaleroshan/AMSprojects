import { configureStore } from "@reduxjs/toolkit";
import { SubjectApi } from "../services/api/SubjectService";
import subjectSlice from "../features/subjectSlice";
import { StudentsApi } from "../services/api/StudentService";
import studentSlice from "../features/studentSlice";

export const store = configureStore({
  reducer: {
    subject: subjectSlice,
    [SubjectApi.reducerPath]: SubjectApi.reducer,
    student: studentSlice,
    [StudentsApi.reducerPath]: StudentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SubjectApi.middleware,StudentsApi.middleware),
});
