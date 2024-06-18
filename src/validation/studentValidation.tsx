import * as yup from "yup";

export const studentValidationSchema = yup.object({
  fullName: yup
    .string()
    .test(
      "is-valid-full-name",
      "Full name must contain only letters and spaces.",
      (value) => /^[a-zA-Z ]+$/.test(value || "")
    )
    .test(
      "is-correct-length",
      "Full name must be between 3 and 30 characters long.",
      (value) => (value && value.length >= 3 && value.length <= 30) || false
    )
    .required("Full name is required."),
  email: yup
    .string()
    .test("is-valid-email", "Invalid Email!!", (value): boolean => {
      if (value === undefined || value === null) {
        return true; // Return true here so required check can handle empty values
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
});
