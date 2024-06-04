import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { userForgotPassValidation } from "../../validation/userValidation";
import DwInput from "../dwForm/DwInput";
import {
  IUserFormValues,
  forgotPassInitialValue,
} from "../interfaces/UserInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const ForgotPasswordForm: React.FC<IUserFormValues> = ({
  buttonName = "Forgot Password",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  return (
    <>
      <Formik
        initialValues={forgotPassInitialValue}
        onSubmit={onSubmit}
        innerRef={formikRef}
        validationSchema={userForgotPassValidation}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h2" variant="h5">
                    Enter your valid email:
                  </Typography>
                  <Box sx={{ mt: 1, width: "300px" }}>
                    <DwInput
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
                      autofocus={true}
                    />
                    <Grid item xs={12}>
                      <MuiLoadingButtonTheme
                        buttonName={buttonName}
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
