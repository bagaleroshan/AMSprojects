import * as yup from "yup";

export const groupValidationSchema = yup.object({
  subjects: yup.string().required("Subject is required."),
  teacher: yup.string().required("Teacher is required."),
  groupName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Group name must contain only letters, numbers, and spaces."
    )
    .min(3, "Group name must be between 3 and 50 characters long.")
    .max(50, "Group name must be between 3 and 50 characters long.")
    .required("Group name is required."),
  students: yup
    .array()
    .of(yup.string().matches(/^[a-zA-Z0-9 ]*$/, "Invalid student name"))
    .required("Students are required."),
  startTime: yup
    .string()
    .matches(
      /^([01]\d|2[0-3]):?([0-5]\d)$/,
      "Start time must be in HH:mm format."
    )
    .required("Start time is required."),
  endTime: yup
    .string()
    .matches(
      /^([01]\d|2[0-3]):?([0-5]\d)$/,
      "End time must be in HH:mm format."
    )
    .required("End time is required."),
  createdAt: yup.date().default(() => new Date()),
  updatedAt: yup.date().default(() => new Date()),
});
