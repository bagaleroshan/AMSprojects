import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPasswordMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { showSuccessToast } from "../../muiModals/toastConfig";

const ForgotPassword = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);

  const [
    forgotPassword,
    {
      isError: isErrorForgotPassword,
      isSuccess: isSuccessForgotPassword,
      isLoading: isLoadingForgotPassword,
      error: errorForgotPassword,
    },
  ] = useForgotPasswordMutation();

  const submitValue = async (values: IUser) => {
    forgotPassword(values);
  };

  useEffect(() => {
    isErrorForgotPassword &&
      (isFetchBaseQueryError(errorForgotPassword)
        ? toast.error(getErrorMessage(errorForgotPassword), { autoClose: 5000 })
        : isSerializedError(errorForgotPassword)
        ? toast.error(errorForgotPassword?.message, { autoClose: 5000 })
        : "Unknown Error");
  }, [isErrorForgotPassword, errorForgotPassword]);

  useEffect(() => {
    if (isSuccessForgotPassword) {
      formikRef.current?.resetForm();
      showSuccessToast("Please check your email to reset-password.");
    }
  });

  return (
    <>
      <ForgotPasswordForm
        buttonName="Send Email"
        isLoading={isLoadingForgotPassword}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default ForgotPassword;
