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
import { userLoginValidation } from "../../validation/userValidation";
import DwHideAndShowPass from "../dwComponents/DwHideAndShowPass";
import DwInput from "../dwComponents/DwInput";
import {
  IUserFormValues,
  userLoginInitialValues,
} from "../interfaces/UserInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const UserLoginForm: React.FC<IUserFormValues> = ({
  buttonName = "SIGN IN",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  return (
    <>
      <Formik
        initialValues={userLoginInitialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
        validationSchema={userLoginValidation}
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
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box sx={{ mt: 1 }}>
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
                    <DwHideAndShowPass
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                      autoComplete="current-password"
                    />
                    <Grid item xs={12}>
                      <MuiLoadingButtonTheme
                        buttonName={buttonName}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid container spacing={3} direction="row">
                      <Grid item xs>
                        <Button
                          color="inherit"
                          href="/forgot-password"
                          sx={{
                            fontSize: "0.7rem",
                            "&:hover": {
                              color: "blue",
                              background: "white",
                            },
                          }}
                        >
                          Forgot password?
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="inherit"
                          href="/register"
                          sx={{
                            fontSize: "0.7rem",
                            "&:hover": {
                              color: "blue",
                              background: "white",
                            },
                          }}
                        >
                          {"Don't have an account? Sign Up"}
                        </Button>
                      </Grid>
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

export default UserLoginForm;
