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
        // to ensure validation is only triggered on form submission
        validateOnBlur={false}
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
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12}>
                        <MuiLoadingButtonTheme
                          buttonName={buttonName}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          color="inherit"
                          href="/forgot-password"
                          sx={{
                            fontSize: "0.7rem",
                            "&:hover": {
                              color: "blue",
                              background: "inherit",
                              textAlign: "center",
                            },
                          }}
                        >
                          Forgot password?
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
