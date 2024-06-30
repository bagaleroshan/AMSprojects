import { FormikProps } from "formik";

export interface IFeedback {
  onTime: number;
  hasDeliveryPower: number;
  hasSkills: number;
  hasInteraction: number;
  isClassFretful: number;
  isClassComfortable: number;
  hasClearConversation: number;
  doesInternetWork: number;
  feelChangeOnYourself: number;
}
export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IFeedback>>;
  onSubmit: (values: IFeedback) => void;
  feedback?: IFeedback;
  autofocus?: boolean;
}
