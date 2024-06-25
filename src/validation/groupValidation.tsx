import * as yup from "yup";

const groupValidationSchema = yup.object({
  subject: yup.string().required("Subject is required."),
  teacher: yup.string().required("Teacher is required."),
  groupName: yup
    .string()
    .required("Group name is required.")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Group name must contain only letters, numbers, and spaces."
    )
    .min(3, "Group name must be at least 3 characters long.")
    .max(50, "Group name must be at most 50 characters long."),
  startTime: yup
    .date()
    .typeError("Invalid start time")
    .required("Start time is required."),
  duration: yup
    .number()
    .required("Duration is required.")
    .min(0, "Duration must be at least 0 minutes.")
    .oneOf(
      [0, 60, 90, 120, 150, 180],
      "Duration must be one of 0, 60, 90, 120, 150, or 180 minutes."
    ),
  endTime: yup
    .date()
    .typeError("Invalid end time")
    .when("startTime", (startTime, schema) => {
      if (startTime) {
        return schema.min(startTime, "End time must be after start time.");
      }
      return schema;
    })
    .nullable(),
});

export default groupValidationSchema;
