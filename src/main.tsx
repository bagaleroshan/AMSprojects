import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { persistor, store } from "./store/store.tsx";
// import CreateProfileImage from "./component/imageUpload/CreateProfileImage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <ToastContainer></ToastContainer>
      </PersistGate>
      <App />
    </Provider>
  </BrowserRouter>
);
