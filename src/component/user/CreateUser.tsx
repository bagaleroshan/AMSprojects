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
import { IUser } from "./UserInterface";
import UserRegisterForm from "./UserRegisterForm";

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
      formikRef.current?.resetForm();
      toast.success(
        "User created successfully! Please check your email for email verification"
      );
    }
  });

  useEffect(() => {
    isErrorCreateUser &&
      (isFetchBaseQueryError(errorCreateUser)
        ? toast.error(getErrorMessage(errorCreateUser))
        : isSerializedError(errorCreateUser)
        ? toast.error(errorCreateUser?.message)
        : "Unknown Error");
  }, [isErrorCreateUser, errorCreateUser]);

  return (
    <>
      <UserRegisterForm
        buttonName="SIGN UP"
        isLoading={isLoadingCreateUser}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateUser;
