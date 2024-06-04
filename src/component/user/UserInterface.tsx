import { FormikProps } from "formik";

/* -------------------- User Sign Up -----------------------------*/
export interface IUser {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string | number;
  role?: string;
  token?: string | null;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const roles = [
  { label: "Teacher", value: "teacher" },
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superAdmin" },
];

export const userInitialValues: IUser = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "", 
  role: "",
};

export interface IUserFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IUser>>;
  onSubmit: (values: IUser) => void;
  user?: IUser;
}

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

export const resetPasswordInitialValue: IUser = {
  newPassword: "",
  confirmPassword: "",
};
