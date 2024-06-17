import * as yup from "yup";

const groupValidationSchema = yup.object({
  subject: yup.string().required("Subject is required."),
  teacher: yup.string().required("Teacher is required."),
  groupName: yup
    .string()
    .test(
      "is-valid-group-name",
      "Group name must contain only letters, numbers, and spaces.",
      (value) => /^[a-zA-Z0-9 ]+$/.test(value || "")
    )
    .test(
      "is-correct-length",
      "Group name must be between 3 and 50 characters long.",
      (value) => (value && value.length >= 3 && value.length <= 50) || false
    )
    .required("Group name is required."),
  startTime: yup
    .date()
    .typeError("Invalid start time")
    .required("Start time is required."),
  endTime: yup
    .date()
    .typeError("Invalid end time")
    .required("End time is required.")
    .test(
      "is-greater",
      "End time must be later than start time.",
      function (value) {
        const { startTime } = this.parent;
        return !startTime || !value || value > startTime;
      }
    )
    .test(
      "is-after-start",
      "End time must be after start time.",
      function (value) {
        const { startTime } = this.parent;
        return !startTime || !value || value > startTime;
      }
    ),
});

export default groupValidationSchema;
