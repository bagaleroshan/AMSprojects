import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/studentSlice";
import subjectSlice from "../features/subjectSlice";
import { StudentApi } from "../services/api/StudentApi";
import { SubjectApi } from "../services/api/SubjectService";
export const store = configureStore({
  reducer: {
    /*-------------------------- Subject -----------------------------------*/
    subject: subjectSlice,
    [SubjectApi.reducerPath]: SubjectApi.reducer,
    /*-------------------------- Student -----------------------------------*/
    student: studentSlice,
    [StudentApi.reducerPath]: StudentApi.reducer,
    /* ------------------------------ Profile Image ----------------------------------*/
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SubjectApi.middleware, StudentApi.middleware),
});
