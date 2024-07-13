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

export interface Feedback {
  student: {
    fullName: string;
    phoneNumber: string;
  };
  onTime: boolean;
  hasDeliveryPower: boolean;
  hasSkills: boolean;
  hasInteraction: boolean;
  isClassFruitful: boolean;
  isClassRoomComfortable: boolean;
  doesInternetWork: boolean;
  feelChangeOnYourself: boolean;
  hasClearConversation: boolean;
  description: string;
}

export interface RequestFeedbackProps {
  groupId: string;
}

interface Teacher {
  fullName: string;
}

interface Subject {
  subjectName: string;
}

export interface Group {
  id: string;
  groupName: string;
  teacher: Teacher;
  subject: Subject;
}
