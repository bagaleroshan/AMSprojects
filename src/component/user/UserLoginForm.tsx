import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
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
import DwHideAndShowPass from "../dwForm/DwHideAndShowPass";
import DwInput from "../dwForm/DwInput";
import { IUserFormValues, userLoginInitialValues } from "./UserInterface";

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
                      {isLoading ? (
                        <LoadingButton
                          loading
                          endIcon={<SendIcon />}
                          loadingPosition="end"
                          type="submit"
                          sx={{
                            backgroundColor: "primary.main",
                            mt: 3,
                            mb: 2,
                          }}
                          fullWidth
                        >
                          SIGNING IN....
                        </LoadingButton>
                      ) : (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          {buttonName}
                        </Button>
                      )}
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
                          href="/users"
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
