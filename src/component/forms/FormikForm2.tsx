import { Button, ButtonGroup, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const FormikForm2 = () => {
  let initialValues = {
    fullName: "",
    email: "",
    password: "",
    description: "",
  };

  let submitValue = (value, other) => {
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

  let genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  let countries = [
    { label: "Select Country", _id: " ", disabled: true },
    { label: "Nepal", _id: "1" },
    { label: "India", _id: "2" },
    { label: "England", _id: "3" },
    { label: "Australia", _id: "4" },
    { label: "USA", _id: "5" },
  ];

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
              <Field name="firstName">
                {({ field, form, meta }) => {
                  // console.log("Field: ", field) it is also an object with value, name, onChange and onBlur events= check the console
                  // console.log("Meta: ", meta) and so does meta
                  return (
                    <div>
                      <TextField
                        id="fullName"
                        name="fullName"
                        label="FullName"
                        value={meta.value}
                        // onChange={(e:any) => {
                        //     formik.setFieldValue("firstName", e.target.value)
                        // }}
                        onChange={field.onChange}
                        helperText={
                          formik.touched.fullName && formik.errors.fullName
                        }
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="email">
                {({ field, form, meta }) => {
                  return (
                    <div>
                      <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={field.onChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="password">
                {({ field, form, meta }) => {
                  return (
                    <div>
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={field.onChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="description">
                {({ field, form, meta }) => {
                  return (
                    <div>
                      <TextField
                        id="description"
                        name="description"
                        label="Description"
                        type="description"
                        value={formik.values.description}
                        onChange={field.onChange}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                        placeholder="Write something here..."
                        multiline
                        rows={5}
                        rowsMax={10}
                      />
                    </div>
                  );
                }}
              </Field>
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

export default FormikForm2;
