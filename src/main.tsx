import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import MyApp from "./MyApp.tsx";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
// import "../Style.css/TLogout.css";
import "./component/MyComponents/style/global.css";
import { persistor, store } from "./store/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      {/* <MyApp></MyApp> */}
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <ToastContainer></ToastContainer>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
