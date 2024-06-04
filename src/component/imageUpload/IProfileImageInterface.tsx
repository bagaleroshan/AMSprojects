import { FormikProps } from "formik";

// interface CustomFormik {
//   values: undefined;
//   current?: undefined;
//   setFieldValue: (args1: string, args2: string) => void;
// }
export interface IAddProfileImageProps {
  name: string;
  formik: {
    values?: object | "";
    current?: object | "";
    setFieldValue?: (args1: string, args2: string) => void;
  };
}
export interface IFormValues {
  profileImage: string;
}
export interface IOnDropProps {
  maxSize: number;
  name: string;
  formik: FormikProps<IAddProfileImageProps["formik"]>;
}
