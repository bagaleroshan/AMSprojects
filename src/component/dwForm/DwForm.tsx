import { Button, ButtonGroup, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import DwInput from "./DwInput";
import DwTextArea from "./DwTextArea";

const DwForm = () => {
  let initialValues = {
    fullName: "",
    email: "",
    password: "",
    description: "",
  };

  let submitValue = (value: any) => {
    console.log("Value", value);
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
                onChange={(e: any) => {
                  formik.setFieldValue("fullName", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="email"
                label="Email"
                type="email"
                onChange={(e: any) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="password"
                label="Password"
                type="password"
                onChange={(e: any) => {
                  formik.setFieldValue("password", e.target.value);
                }}
              ></DwInput>

              <DwTextArea
                name="description"
                label="Description"
                type="text"
                onChange={(e: any) => {
                  formik.setFieldValue("description", e.target.value);
                }}
              ></DwTextArea>

              <ButtonGroup>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  //   onClick={() => alert("Button Submitted")}
                >
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
