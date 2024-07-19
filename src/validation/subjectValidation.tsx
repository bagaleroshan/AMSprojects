import * as yup from "yup";

export const validationSchema = yup.object({
  subjectName: yup
    .string()
    .min(3)
    .max(100)
    .required("Subject name is required"),
  subjectCode: yup.string().min(3).max(30).required("Subject Code is required"),
  numberOfClasses: yup
    .number()
    .required("Please choose the number of classes"),
});
