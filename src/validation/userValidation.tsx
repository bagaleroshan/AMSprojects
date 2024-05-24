import * as yup from "yup";

export const userValidation = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phoneNumber: yup
    .number()
    .min(10, "Phone number must have 10 numbers")
    .required("Phone number is required"),
  role: yup.string().required("State the role"),
});
