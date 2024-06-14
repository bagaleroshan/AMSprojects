import { FormikProps } from "formik";

export interface IGroup {
  id?: string;
  subject: string;
  teacher: string;
  groupName: string;
  students: string;
  startTime: Date;
  endTime: Date;
}

export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IGroup>>;
  onSubmit: (values: IGroup) => void;
  group?: IGroup;
  autofocus?: boolean;
}
