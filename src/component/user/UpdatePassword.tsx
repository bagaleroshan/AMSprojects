import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { IUser } from "./UserInterface";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [
    updatePassword,
    {
      isError: isErrorUpdatePassword,
      isSuccess: isSuccessUpdatePassword,
      isLoading: isLoadingUpdatePassword,
      error: errorUpdatePassword,
    },
  ] = useUpdatePasswordMutation();

  const submitValue = async (values: IUser) => {
    updatePassword(values);
    navigate(`/users/profile`);
  };

  useEffect(() => {
    isErrorUpdatePassword &&
      (isFetchBaseQueryError(errorUpdatePassword)
        ? toast.error(getErrorMessage(errorUpdatePassword))
        : isSerializedError(errorUpdatePassword)
        ? toast.error(errorUpdatePassword?.message)
        : "Unknown Error");
  }, [isErrorUpdatePassword, errorUpdatePassword]);

  useEffect(() => {
    if (isSuccessUpdatePassword) toast.success("Subject Updated Successfully");
  }, [isSuccessUpdatePassword]);

  return (
    <div>
      <UpdatePasswordForm
        buttonName="Update Password"
        isLoading={isLoadingUpdatePassword}
        onSubmit={submitValue}
      />
    </div>
  );
};

export default UpdatePassword;
