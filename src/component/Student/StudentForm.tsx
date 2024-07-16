import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { studentValidationSchema } from "../../validation/studentValidation";
import DwInput from "../dwComponents/DwInput";
import { IFormValues, IStudent } from "../interfaces/StudentInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const StudentForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  student = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const studentInitialValues: IStudent = {
    fullName: student?.fullName || "",
    email: student?.email || "",
    phoneNumber: student?.phoneNumber || "",
  };
  return (
    <div>
      <Formik
        initialValues={studentInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={studentValidationSchema}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>

                  <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    {buttonName}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DwInput
                          name="fullName"
                          label="Full Name"
                          type="text"
                          fullWidth
                          id="fullName"
                          onChange={(e) => {
                            formik.setFieldValue("fullName", e.target.value);
                          }}
                          autofocus={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="email"
                          label="Email"
                          type="email"
                          onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                          }}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="phoneNumber"
                          label="Phone Number"
                          type="number"
                          onChange={(e) => {
                            formik.setFieldValue("phoneNumber", e.target.value);
                          }}
                          isPhoneNumber={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiLoadingButtonTheme
                          buttonName={buttonName}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid container justifyContent="center">
                        <Grid item>
                          {/* <Button
                            color="inherit"
                            href="/admin/forms/students"
                            sx={{
                              "&:hover": {
                                color: "blue",
                                // background: "white",
                              },
                            }}
                          >
                            Go back?
                          </Button> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StudentForm;
