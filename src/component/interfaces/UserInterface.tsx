import { FormikProps } from "formik";

/* -------------------- User Sign Up -----------------------------*/
export interface IUser {
  id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string | number;
  role?: string;
  token?: string | null | undefined;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  adminToken?: string;
  teachersToken?: string;
}

export const roles = [
  { label: "Teacher", value: "teacher" },
  { label: "Admin", value: "admin" },
];

export const 
userInitialValues: IUser = {
  fullName: "",
  email: "",
  phoneNumber: "",
  role: "teacher",
};

export interface IUserFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IUser>>;
  onSubmit: (values: IUser) => void;
  user?: IUser;
  autofocus?: boolean;
}

// export interface TokenProps {
//   token: string | undefined | null;
// }

/* ------------------------------ User Login --------------------------------- */

export const userLoginInitialValues: IUser = {
  email: "",
  password: "",
};

/* -------------------------------------- Update Password ------------------------------ */

export const updatePassInitialValue: IUser = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/* ---------------------------- Forgot Password ---------------------------------------- */

export const forgotPassInitialValue: IUser = {
  email: "",
};

/* ---------------------------- Reset Password ---------------------------------------- */

export const resetPassInitialValue: IUser = {
  newPassword: "",
  confirmPassword: "",
};
