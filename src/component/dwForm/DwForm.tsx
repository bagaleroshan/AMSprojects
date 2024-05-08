import { Button, ButtonGroup } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import DwCheckbox from "./DwCheckbox";
import DwInput from "./DwInput";
import DwRadio from "./DwRadio";
import DwSelect from "./DwSelect";
import DwHideAndShowPass from "./DwHideAndShowPass";
import DwDate from "./DwDate";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  description: string;
  isMarried: boolean;
  subject: string;
  gender: string;
  dob: Date;
  date: object | null;
}

const DwForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    description: "",
    isMarried: false,
    subject: "",
    gender: "",
    dob: new Date(),
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
    subject: yup.string().required("Subject hasn't been selected yet"),
    gender: yup.string().required("Please select your gender"),
    dob: yup.date().required("Please select your date of birth"),
  });

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  const subjects = [
    { label: "Math", value: "Math" },
    { label: "Javascript", value: "Javascript" },
    { label: "Physics", value: "Physics" },
    { label: "Java", value: "Java" },
    { label: "Express.js", value: "Express.js" },
  ];

  const submitValue = (values: FormValues) => {
    console.log("Value", values);
  };

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
                onChange={(e) => {
                  formik.setFieldValue("fullName", e.target.value);
                }}
              ></DwInput>

              <DwInput
                name="email"
                label="Email"
                type="email"
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
              ></DwInput>

              <DwHideAndShowPass
                name="password"
                label="Password"
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
              ></DwHideAndShowPass>

              <DwDate
                name="dob"
                label="D.O.B"
                onChange={(date) => {
                  formik.setFieldValue("dob", date.$d);
                }}
              ></DwDate>

              <DwInput
                name="description"
                label="Description"
                type="text"
                multiline={true}
                onChange={(e) => {
                  formik.setFieldValue("description", e.target.value);
                }}
              ></DwInput>

              <DwCheckbox
                name="isMarried"
                label="Is Married ?"
                onChange={(e) => {
                  formik.setFieldValue("isMarried", e.target.checked);
                }}
              ></DwCheckbox>

              <DwSelect
                name="subject"
                label="Select Subject"
                onChange={(e) => {
                  formik.setFieldValue("subject", e.target.value);
                }}
                selectLabels={subjects}
              ></DwSelect>

              <DwRadio
                name="gender"
                label="Gender"
                onChange={(e) => {
                  formik.setFieldValue("gender", e.target.value);
                }}
                radioLabels={genders}
              ></DwRadio>

              <ButtonGroup>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  // onClick={() => alert("Button Submitted")}
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
