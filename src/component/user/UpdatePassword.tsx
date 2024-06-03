import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearToken } from "../../features/userSlice";
import { useUpdatePasswordMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import UpdatePasswordForm from "./UpdatePasswordForm";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    updatePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }).unwrap();
  };

  useEffect(() => {
    isErrorUpdatePassword &&
      (isFetchBaseQueryError(errorUpdatePassword)
        ? toast.error(getErrorMessage(errorUpdatePassword), { autoClose: 5000 })
        : isSerializedError(errorUpdatePassword)
        ? toast.error(errorUpdatePassword?.message, { autoClose: 5000 })
        : "Unknown Error");
  }, [isErrorUpdatePassword, errorUpdatePassword]);

  useEffect(() => {
    if (isSuccessUpdatePassword) {
      toast.success("Password Updated Successfully", { autoClose: 2000 });
      localStorage.removeItem("token");
      dispatch(clearToken());
      navigate("/login");
    }
  });

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
