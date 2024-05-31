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
import CreateUserForm from "./CreateUserForm";
import { IUser } from "./UserInterface";

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
    console.log(values);
    createUser(values);
  };

  useEffect(() => {
    if (isSuccessCreateUser) {
      toast.success("Please check your email for login verification", {
        autoClose: 3000,
      });
      formikRef.current?.resetForm();
    }
  });

  useEffect(() => {
    isErrorCreateUser &&
      (isFetchBaseQueryError(errorCreateUser)
        ? toast.error(getErrorMessage(errorCreateUser), { autoClose: 5000 })
        : isSerializedError(errorCreateUser)
        ? toast.error(errorCreateUser?.message, { autoClose: 5000 })
        : "Unknown Error");
  }, [isErrorCreateUser, errorCreateUser]);

  return (
    <>
      <CreateUserForm
        buttonName="SIGN UP"
        isLoading={isLoadingCreateUser}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default CreateUser;
