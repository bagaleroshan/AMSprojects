import { FormikProps } from "formik";

export interface IStudent {
  fullName: string;
  email: string;
  course: string;
  phoneNumber: string;
}

export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IStudent>>;
  onSubmit: (values: IStudent) => void;
  student?: IStudent;
}
