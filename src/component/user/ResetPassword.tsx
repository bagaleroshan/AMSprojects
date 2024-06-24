import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import ResetPasswordForm from "./ResetPasswordForm";
import { showSuccessToast } from "../../muiModals/toastConfig";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const token = params.get("token");
  if (token !== null) {
    localStorage.setItem("token", token);
  }

  const [
    resetPassword,
    {
      isError: isErrorResetPassword,
      isSuccess: isSuccessResetPassword,
      isLoading: isLoadingResetPassword,
      error: errorResetPassword,
    },
  ] = useResetPasswordMutation();

  const submitValue = async (values: IUser) => {
    resetPassword({
      password: values.confirmPassword,
    }).unwrap();
  };

  useEffect(() => {
    isErrorResetPassword &&
      (isFetchBaseQueryError(errorResetPassword)
        ? toast.error(getErrorMessage(errorResetPassword))
        : isSerializedError(errorResetPassword)
        ? toast.error(errorResetPassword?.message)
        : "Unknown Error");
  }, [isErrorResetPassword, errorResetPassword]);

  useEffect(() => {
    if (isSuccessResetPassword) {
      showSuccessToast("Password reset completed Successfully");
      localStorage.removeItem("token");
      navigate("/login");
    }
  });

  return (
    <div>
      <ResetPasswordForm
        buttonName="Reset Password"
        isLoading={isLoadingResetPassword}
        onSubmit={submitValue}
      />
    </div>
  );
};

export default ResetPassword;
