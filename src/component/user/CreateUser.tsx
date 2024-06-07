import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { setRole } from "../../features/userSlice";
import { useCreateUserMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import CreateUserForm from "./CreateUserForm";

const CreateUser = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);

  const [
    createUser,
    {
      isError: isErrorCreateUser,
      isSuccess: isSuccessCreateUser,
      isLoading: isLoadingCreateUser,
      error: errorCreateUser,
    },
  ] = useCreateUserMutation();

  const submitValue = async (values: IUser) => {
    createUser(values);
  };

  useEffect(() => {
    if (isSuccessCreateUser) {
      toast.success("Please check your email for login verification", {
        autoClose: 3000,
      });
      formikRef.current?.resetForm();
    }
  }, [isSuccessCreateUser]);

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
