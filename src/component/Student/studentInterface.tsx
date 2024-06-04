import { FormikProps } from "formik";

export interface IStudent {
  // id: number;
  fullName: string;
  email: string;
  // address: string;
  phoneNumber: string;
}

export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IStudent>>;
  onSubmit: (values: IStudent) => void;
  student?: IStudent;
}
