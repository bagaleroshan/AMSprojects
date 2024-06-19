import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import groupSlice from "../features/groupSlice";
import studentSlice from "../features/studentSlice";
import subjectSlice from "../features/subjectSlice";
import teacherSlice from "../features/teacherSlice";
import userSlice from "../features/userSlice";
import { GroupApi } from "../services/api/GroupService";
import { StudentApi } from "../services/api/StudentApi";
import { SubjectApi } from "../services/api/SubjectService";
import { TeacherApi } from "../services/api/TeacherService";
import { UserApi } from "../services/api/UserService";

// Configuration object for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "subject", "student", "group"], // only persist the user reducer
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userSlice,
  subject: subjectSlice,
  student: studentSlice,
  group: groupSlice,
  teacher: teacherSlice,
  [UserApi.reducerPath]: UserApi.reducer,
  [SubjectApi.reducerPath]: SubjectApi.reducer,
  [StudentApi.reducerPath]: StudentApi.reducer,
  [GroupApi.reducerPath]: GroupApi.reducer,
  [TeacherApi.reducerPath]: TeacherApi.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      SubjectApi.middleware,
      UserApi.middleware,
      StudentApi.middleware,
      GroupApi.middleware,
      TeacherApi.middleware
    ),
});

// Create the persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
