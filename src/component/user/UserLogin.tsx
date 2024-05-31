import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setToken } from "../../features/userSlice";
import { useUserLoginMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "./UserInterface";
import UserLoginForm from "./UserLoginForm";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [
    userLogin,
    {
      isError: isErrorUserLogin,
      isSuccess: isSuccessUserLogin,
      isLoading: isLoadingUserLogin,
      error: errorUserLogin,
      data: userLoginData,
    },
  ] = useUserLoginMutation();

  const submitValue = async (values: IUser) => {
    userLogin(values);
  };

  useEffect(() => {
    isErrorUserLogin &&
      (isFetchBaseQueryError(errorUserLogin)
        ? toast.error(getErrorMessage(errorUserLogin), { autoClose: 5000 })
        : isSerializedError(errorUserLogin)
        ? toast.error(errorUserLogin?.message, { autoClose: 5000 })
        : "Unknown Error");
  }, [isErrorUserLogin, errorUserLogin]);

  useEffect(() => {
    if (isSuccessUserLogin) {
      console.log(userLoginData);

      localStorage.setItem("token", userLoginData.token);
      dispatch(setToken(userLoginData.token));
      toast.success(userLoginData.message, { autoClose: 2000 });
      navigate("/users/update-password");

      // console.log(
      //   "userLoginData.isPasswordChanged status: ",
      //   userLoginData.isPasswordChanged
      // );

      // if (userLoginData.isPasswordChanged === false) {
      //   navigate("/users/update-password");
      //   toast.success("Let's set our own password!!");
      //   // } else {
      //   localStorage.setItem("token", userLoginData.token);
      //   dispatch(setToken(userLoginData.token));
      //   toast.success("Welcome Aboard!!");
      //   navigate("/users/dashboard");
      //   toast.success(userLoginData.message);
      // }
    }
  });

  return (
    <>
      <UserLoginForm
        buttonName="SIGN IN"
        isLoading={isLoadingUserLogin}
        formikRef={formikRef}
        onSubmit={submitValue}
      />
    </>
  );
};

export default UserLogin;
