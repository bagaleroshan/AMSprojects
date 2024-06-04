import * as yup from "yup";

export const studentValidationSchema = yup.object({
  // fullName: yup.string().min(3).max(100).required("Student name is required"),
  fullName: yup
    .string()
    .min(3)
    .max(100)
    .matches(/^[a-zA-Z\s]*$/, "Full Name can only contain letters and spaces.")
    .required("Full Name is required."),
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Email is required."),
  // address: yup.string().min(3).max(30).required("Address is Required."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone Number is required."),
});
