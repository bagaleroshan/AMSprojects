// toastConfig.ts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../global.css";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: "custom-toast-success",
    autoClose: 3000,
  });
};
