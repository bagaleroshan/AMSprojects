import * as yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userValidation = yup.object().shape({
  fullName: yup
    .string()
    // .test(
    //   "is-valid-full-name",
    //   "Full name must contain only letters and spaces.",
    //   (value) => /^[a-zA-Z ]+$/.test(value || "")
    // )
    .test(
      "is-correct-length",
      "User name must be between 3 and 30 characters long.",
      (value) => (value && value.length >= 3 && value.length <= 30) || false
    )
    .required("User name is required."),
  email: yup
    .string()
    .test("is-valid-email", "Invalid Email!!", (value): boolean => {
      if (value === undefined || value === null) {
        return true;
      }
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    })
    .required("Email is required."),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must have 10 digits")
    .test("is-valid-phone-number", "Invalid phone number", (value): boolean => {
      if (value === undefined || value === null) {
        return true;
      }
      return /^(?:\+977[-\s]?)?(?:98\d{8}|97\d{8}|0[1-9]\d{8})$/.test(value);
    })
    .required("Phone number is required."),
  role: yup
    .string()
    .test("is-valid-role", "Invalid Role", (value): boolean => {
      if (value === undefined || value === null) {
        return true;
      }
      return /^(admin|teacher|superAdmin)$/.test(value);
    })
    .required("Role is required."),
});

export const myProfileUpdateValidation = yup.object().shape({
  fullName: yup
    .string()
    .test(
      "is-valid-full-name",
      "Full name must contain only letters and spaces.",
      (value): boolean => /^[a-zA-Z ]+$/.test(value || "")
    )
    .test(
      "is-correct-length",
      "Full name must be between 3 and 30 characters long.",
      (value): boolean =>
        (value && value.length >= 3 && value.length <= 30) || false
    )
    .required("Full name is required."),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must have 10 digits")
    .test("is-valid-phone-number", "Invalid phone number", (value): boolean => {
      if (value === undefined || value === null) {
        return true;
      }
      return /^(?:\+977[-\s]?)?(?:98\d{8}|97\d{8}|0[1-9]\d{8})$/.test(value);
    })
    .required("Phone number is required."),
});

export const userLoginValidation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userUpdatePassValidation = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    )
    .required("Please write your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const userForgotPassValidation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

/* --------------------Reset Password -------------------------------------- */

export const userResetPassValidation = yup.object({
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    )
    .required("Please write your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
