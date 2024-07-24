import { FormikProps } from "formik";
import { DataItem } from "./TableInterface";

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

export const feedbackColumns = [
  { name: "onTime", label: "Does class starts on time?" },
  {
    name: "hasDeliveryPower",
    label: "Is lessons delivered properly?",
  },
  { name: "hasSkills", label: "Is teacher skilled?" },
  {
    name: "hasInteraction",
    label: "Is class fully interactive?",
  },
  { name: "isClassFruitful", label: "Is Class Fruitful?" },
  {
    name: "isClassRoomComfortable",
    label: "Is Classroom comfortable?",
  },
  {
    name: "hasClearConversation",
    label: "Does teacher communicate properly?",
  },
  {
    name: "doesInternetWork",
    label: "Does internet work properly?",
  },
  {
    name: "feelChangeOnYourself",
    label: "Did you feel change on yourself?",
  },
];
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
  hasRequestedFeedback:String;
}

/* **************************Feedback Export CSV*************** */
export interface Column {
  key: string;
  header: string;
}

export const exportFeedbackColumn = [
  { key: "studentName", header: "Student Name" },
  { key: "phoneNumber", header: "Student Number" },
  { key: "onTime", header: "Does class starts on time?" },
  {
    key: "hasDeliveryPower",
    header: "Is lessons delivered properly?",
  },
  { key: "hasSkills", header: "Is teacher skilled?" },
  {
    key: "hasInteraction",
    header: "Is class fully interactive?",
  },
  { key: "isClassFruitful", header: "Is Class Fruitful?" },
  {
    key: "isClassRoomComfortable",
    header: "Is Classroom comfortable?",
  },
  {
    key: "hasClearConversation",
    header: "Does teacher communicate properly?",
  },
  {
    key: "doesInternetWork",
    header: "Does internet work properly?",
  },
  {
    key: "feelChangeOnYourself",
    header: "Did you feel change on yourself?",
  },
  {
    key: "description",
    header: "Thoughts",
  },
];

export interface FeedbackExportExcelProps {
  data: DataItem[];
  columns: Column[];
  fileName: string;
}
