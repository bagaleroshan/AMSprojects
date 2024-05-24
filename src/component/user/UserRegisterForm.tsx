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
import { userValidation } from "../../validation/userValidation";
import DwInput from "../dwForm/DwInput";
import DwSelect from "../dwForm/DwSelect";
import { IUserFormValues, roles, userInitialValues } from "./UserInterface";

const UserRegisterForm: React.FC<IUserFormValues> = ({
  buttonName = "SIGN UP",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  return (
    <>
      <Formik
        initialValues={userInitialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
        validationSchema={userValidation}
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
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DwInput
                          name="fullName"
                          label="Full Name"
                          type="text"
                          required
                          fullWidth
                          id="firstName"
                          onChange={(e) => {
                            formik.setFieldValue("fullName", e.target.value);
                          }}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          required
                          fullWidth
                          type="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          onChange={(e) => {
                            formik.setFieldValue("password", e.target.value);
                          }}
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          required
                          fullWidth
                          name="phoneNumber"
                          label="Phone Number"
                          type="number"
                          onChange={(e) => {
                            formik.setFieldValue("phoneNumber", e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          name="role"
                          label="Role"
                          onChange={(e) => {
                            formik.setFieldValue("role", e.target.value);
                          }}
                          selectLabels={roles}
                        />
                      </Grid>

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
                          SIGNING UP....
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

                      <Grid container justifyContent="center">
                        <Grid item>
                          <Link href="/users/login" variant="body2">
                            Already have an account? Sign in
                          </Link>
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
    </>
  );
};

export default UserRegisterForm;
