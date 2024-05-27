import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { Ref } from "react-hook-form";
import * as yup from "yup";
import DwInput from "../dwForm/DwInput";

interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

interface IFormValues {
  buttonName: string;
  isLoading: boolean;
  formikRef: (Ref<User<User>> | undefined) & object;
  onSubmit: (data: User) => void;
  user?: User;
}
const role = {
  user: "user",
};

const UserForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  formikRef = {},
  onSubmit = () => {},
  user = {},
}) => {
  const initialValues: User = {
    fullName: user.fullName || "",
    email: user.email || "",
    password: user.password || "",
    phoneNumber: user.phoneNumber || "",
    role: user.role || role?.user,
  };

  const validationSchema = yup.object({
    fullName: yup.string().min(3).max(100).required("fullName is required"),
    email: yup.string().required("email is required"),
    password: yup
      .string()
      .min(8, "You should at least have 8 characters")
      .max(16)
      .required("password must be unique"),
    phoneNumber: yup
      .number()
      //   .min(8, "You should at least have 8 characters")
      //   .max(16)
      .required("phoneNumber must be 10 digit"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ marginTop: "10px", padding: "16px" }}
              >
                <DwInput
                  name="fullName"
                  label="Full Name"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("fullName", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="email"
                  label="Email"
                  type="email"
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>
                <DwInput
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  onChange={(e) => {
                    formik.setFieldValue("phoneNumber", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                {isLoading ? (
                  <LoadingButton
                    loading
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    type="submit"
                    sx={{
                      backgroundColor: "secondary.main",
                      // marginTop: "10px",
                    }}
                  >
                    CREATING....
                  </LoadingButton>
                ) : (
                  <ButtonGroup>
                    {
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        {buttonName}
                      </Button>
                    }
                  </ButtonGroup>
                )}
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserForm;
