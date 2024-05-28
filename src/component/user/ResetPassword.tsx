import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "./UserInterface";
import ResetPasswordForm from "./ResetPasswordForm";
import { useResetPasswordMutation } from "../../services/api/UserService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [
    ResetPassword,
    {
      isError: isErrorResetPassword,
      isSuccess: isSuccessResetPassword,
      isLoading: isLoadingResetPassword,
      error: errorResetPassword,
    },
  ] = useResetPasswordMutation();

  const submitValue = async (values: IUser) => {
    ResetPassword(values);
    navigate(`/users/profile`);
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
    if (isSuccessResetPassword) toast.success("Reset Password Successfully.");
  }, [isSuccessResetPassword]);

  return (
    <div>
      <ResetPasswordForm
        buttonName="Update Password"
        isLoading={isLoadingResetPassword}
        onSubmit={submitValue}
      />
    </div>
  );
};

export default ResetPassword;
