import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setRole, setToken } from "../../features/userSlice";
import { useUserLoginMutation } from "../../services/api/UserService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { IUser } from "../interfaces/UserInterface";
import UserLoginForm from "./UserLoginForm";
import { RootState } from "../../store/store";

const UserLogin = () => {
  const formikRef = useRef<FormikProps<IUser> | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = useSelector((store: RootState) => store.user.adminToken);

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
    if (isErrorUserLogin) {
      if (isFetchBaseQueryError(errorUserLogin)) {
        const errorMessage = getErrorMessage(errorUserLogin);
        toast.error(errorMessage, { autoClose: 5000 });
      } else if (isSerializedError(errorUserLogin)) {
        toast.error(errorUserLogin?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorUserLogin, errorUserLogin]);

  useEffect(() => {
    if (isSuccessUserLogin) {
      dispatch(setRole(userLoginData.result.role));
      dispatch(setToken(userLoginData.token));
      adminToken ? navigate("/admin") : navigate("/teachers");
      // toast.success(userLoginData.message, { autoClose: 1000 });
    }
  }, [isSuccessUserLogin, userLoginData, adminToken, dispatch, navigate]);

  /*  // adminToken
      //   ? navigate("/admin/update-password")
      //   : navigate("/teachers/update-password");
   */

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
