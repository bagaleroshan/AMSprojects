import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/studentSlice";
import subjectSlice from "../features/subjectSlice";
import userSlice from "../features/userSlice";
import { StudentApi } from "../services/api/StudentApi";
import { SubjectApi } from "../services/api/SubjectService";
import { UserApi } from "../services/api/UserService";
export const store = configureStore({
  reducer: {
    /*------------ User -------------*/
    user: userSlice,
    [UserApi.reducerPath]: UserApi.reducer,

    /*-------------------------- Subject -----------------------------------*/
    subject: subjectSlice,
    [SubjectApi.reducerPath]: SubjectApi.reducer,
    /*-------------------------- Student -----------------------------------*/
    student: studentSlice,
    [StudentApi.reducerPath]: StudentApi.reducer,
    /* ------------------------------ Profile Image ----------------------------------*/
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      SubjectApi.middleware,
      UserApi.middleware,
      StudentApi.middleware
    ),
});
