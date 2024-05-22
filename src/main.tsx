import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store.tsx";
import CreateProfileImage from "./component/imageUpload/CreateProfileImage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      {/* <App /> */}
      <CreateProfileImage></CreateProfileImage>
    </Provider>
  </BrowserRouter>
);
