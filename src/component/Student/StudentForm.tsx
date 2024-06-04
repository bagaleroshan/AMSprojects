import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { studentValidationSchema } from "../../validation/studentValidation";
import DwInput from "../dwForm/DwInput";
import { IFormValues, IStudent } from "./studentInterface";

const StudentForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  student = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const initialValues: IStudent = {
    // id: student?.id || 1,
    fullName: student?.fullName || "",
    email: student?.email || "",
    // address: student?.address || "",
    phoneNumber: student?.phoneNumber || "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={studentValidationSchema}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ marginTop: "10px", padding: "16px", width: "60" }}
              >
                {/* <DwInput
                  name="id"
                  label="ID"
                  type="number"
                  onChange={(e) => {
                    formik.setFieldValue("id", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput> */}
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
                {/* <DwInput
                  name="address"
                  label="Address"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput> */}

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

export default StudentForm;
