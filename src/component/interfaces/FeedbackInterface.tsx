import { FormikProps } from "formik";

export interface IFeedback {
  onTime: number;
  hasDeliveryPower: number;
  hasSkills: number;
  hasInteraction: number;
  isClassFruitful: number;
  isClassRoomComfortable: number;
  hasClearConversation: number;
  doesInternetWork: number;
  feelChangeOnYourself: number;
  description: string;
}
export interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef?: React.Ref<FormikProps<IFeedback>>;
  onSubmit: (values: IFeedback) => void;
  feedback?: IFeedback;
  autofocus?: boolean;
}
