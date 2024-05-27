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
import { Link } from "react-router-dom";
import { userLoginValidation } from "../../validation/userValidation";
import DwInput from "../dwForm/DwInput";
import { IUserFormValues, userLoginInitialValues } from "./UserInterface";
import DwHideAndShowPass from "../dwForm/DwHideAndShowPass";

const UserLoginForm: React.FC<IUserFormValues> = ({
  buttonName = "SIGN UP",
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
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <DwInput
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
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
                            backgroundColor: "secondary.main",
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
                          color="secondary"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          {buttonName}
                        </Button>
                      )}
                    </Grid>
                    <Grid container spacing={6} direction="row">
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          <Typography
                            variant="body2"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Forgot password?
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/users" variant="body2">
                          <Typography
                            variant="body2"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {"Don't have an account? Sign Up"}
                          </Typography>
                        </Link>
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
