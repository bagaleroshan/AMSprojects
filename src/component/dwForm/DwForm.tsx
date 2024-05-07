import { Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { ChangeEvent } from "react";
import * as yup from "yup";
import DwCheckbox from "./DwCheckbox";
import DwInput from "./DwInput";
interface IFormValues {
  fullName: string;
  email: string;
  password: string;
  description: string;
  isMarried: boolean;
}

const DwForm = () => {
  const initialValues: IFormValues = {
    fullName: "",
    email: "",
    password: "",
    description: "",
    isMarried: false,
  };

  const submitValue = (
    values: IFormValues
    // actions: FormikHelpers<FormValues>
  ) => {
    console.log("Values", values);
  };

  const validationSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    description: yup.string().required("Please fill in description"),
    isMarried: yup.boolean().required("Please verify your marital status"),
    // dob: yup.date().required("Please select your date of birth")
  });

  // let genders = [
  //   { label: "Male", value: "male" },
  //   { label: "Female", value: "female" },
  //   { label: "Others", value: "others" },
  // ];

  // let countries = [
  //   { label: "Select Country", _id: " ", disabled: true },
  //   { label: "Nepal", _id: "1" },
  //   { label: "India", _id: "2" },
  //   { label: "England", _id: "3" },
  //   { label: "Australia", _id: "4" },
  //   { label: "USA", _id: "5" },
  // ];

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitValue}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <DwInput
                name="fullName"
                label="Full Name"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("fullName", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="email"
                label="Email"
                type="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="password"
                label="Password"
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("password", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="description"
                label="Description"
                type="text"
                multiline={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("description", e.target.value);
                }}
              ></DwInput>

              <DwCheckbox
                name="isMarried"
                label="Is Married ?"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("isMarried", e.target.checked);
                }}
              ></DwCheckbox>

              <ButtonGroup>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DwForm;
