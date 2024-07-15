import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import CreateUserForm from "./CreateUserForm";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../muiModals/toastConfig";

const CreateUser = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const navigate = useNavigate();

  const [
    createUser,
    {
      isError: isErrorCreateUser,
      isSuccess: isSuccessCreateUser,
      isLoading: isLoadingCreateUser,
      error: errorCreateUser,
      data: dataCreateUser,
    },
  ] = useCreateUserMutation();

  const submitValue = async (values: IUser) => {
    createUser(values);
  };

  useEffect(() => {
    if (isSuccessCreateUser) {
      showSuccessToast(dataCreateUser.message);
      formikRef.current?.resetForm();
      navigate("/admin/users");
    }
  }, [isSuccessCreateUser, dataCreateUser, navigate]);

  useEffect(() => {
    if (isErrorCreateUser) {
      if (isFetchBaseQueryError(errorCreateUser)) {
        toast.error(getErrorMessage(errorCreateUser), { autoClose: 5000 });
      } else if (isSerializedError(errorCreateUser)) {
        toast.error(errorCreateUser?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorCreateUser, errorCreateUser]);

  return (
    <>
      <CreateUserForm
        buttonName="CREATE USER"
        isLoading={isLoadingCreateUser}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateUser;
