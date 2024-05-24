import { FormikProps } from "formik";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string | number;
  role: string;
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
