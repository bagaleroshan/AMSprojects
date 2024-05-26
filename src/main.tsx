import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store/store.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyApp from "./MyApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      {/* <App /> */}
      <MyApp></MyApp>
    </Provider>
  </BrowserRouter>
);
