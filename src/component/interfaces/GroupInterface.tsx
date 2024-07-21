import { FormikProps } from "formik";
import { Column } from "./FeedbackInterface";
import { DataItem } from "./TableInterface";

export interface IGroup {
  id?: string;
  subject: string;
  teacher: string;
  groupName: string;
  students?: string;
  startTime: string;
  endTime: string;
}
export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IGroup>>;
  onSubmit: (values: IGroup) => void;
  group?: IGroup;
  autofocus?: boolean;
}

/* Export CSV */

export interface GroupExportExcelProps {
  data: DataItem[];
  columns: Column[];
  fileName: string;
}
