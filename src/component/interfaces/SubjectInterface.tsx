import { FormikProps } from "formik";

export interface ISubject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number | string;
}

export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<ISubject>>;
  onSubmit: (values: ISubject) => void;
  subject?: ISubject;
}
