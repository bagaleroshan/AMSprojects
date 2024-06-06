import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import subjectSlice from "../features/subjectSlice";
import { StudentApi } from "../services/api/StudentApi";
import { SubjectApi } from "../services/api/SubjectService";
import { UserApi } from "../services/api/UserService";
import studentSlice from "../features/studentSlice";
import { StudentsApi } from "../services/api/StudentService";
import userSlice from "../features/userSlice";

// Configuration object for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "subject", "student"], // only persist the user reducer
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userSlice,
  subject: subjectSlice,
  student: studentSlice,
  [UserApi.reducerPath]: UserApi.reducer,
  [SubjectApi.reducerPath]: SubjectApi.reducer,
  [StudentsApi.reducerPath]: StudentsApi.reducer,
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
    }).concat(SubjectApi.middleware, UserApi.middleware, StudentsApi.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
