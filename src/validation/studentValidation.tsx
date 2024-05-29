import * as yup from "yup";

export const studentValidationSchema = yup.object({
  fullName: yup.string().min(3).max(100).required("Student name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  course: yup.string().min(2).max(30).required("Course is Required"),
  phoneNumber: yup
    .string()
    .matches(
      /^\d{10}$/,
      'Phone number must be exactly 10 digits.'
    )
    .required('Phone Number is required'),
});
