import { ISubject } from "./subject/subjectInterface";
const subject: ISubject = {
  subjectName: "",
  subjectCode: "",
  numberOfClasses: 0,
};
export const subjectInitialValues: ISubject = {
  subjectName: subject.subjectName || "",
  subjectCode: subject.subjectCode || "",
  numberOfClasses: subject.numberOfClasses || "",
};
