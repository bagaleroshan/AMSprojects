import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { store } from "./store/store.tsx";
import { CssBaseline } from "@mui/material";
// import CreateProfileImage from "./component/imageUpload/CreateProfileImage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <ToastContainer></ToastContainer>
      <App />
      {/* <CreateProfileImage></CreateProfileImage> */}
    </Provider>
  </BrowserRouter>
);
