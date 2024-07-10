import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { userUpdatePassValidation } from "../../validation/userValidation";
import DwHideAndShowPass from "../dwComponents/DwHideAndShowPass";
import {
  IUserFormValues,
  updatePassInitialValue,
} from "../interfaces/UserInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const validateOldPassword = async (value) => {
  return value === "correctOldPassword";
};

const UpdatePasswordForm: React.FC<IUserFormValues> = ({
  buttonName = "SIGN UP",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const [oldPasswordError, setOldPasswordError] = useState("");

  return (
    <Formik
      initialValues={updatePassInitialValue}
      onSubmit={onSubmit}
      innerRef={formikRef}
      validationSchema={userUpdatePassValidation}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik) => {
        const handleBlur = async (e) => {
          const isValid = await validateOldPassword(e.target.value);
          if (!isValid) {
            setOldPasswordError("Old password is incorrect");
          } else {
            setOldPasswordError("");
          }
          formik.handleBlur(e);
        };

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
                  <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {buttonName}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <DwHideAndShowPass
                    margin="normal"
                    fullWidth
                    name="oldPassword"
                    label="Old Password"
                    onChange={(e) => {
                      formik.setFieldValue("oldPassword", e.target.value);
                    }}
                    onBlur={handleBlur}
                    autoComplete="oldPassword"
                    autoFocus={true}
                    error={Boolean(oldPasswordError)}
                    helperText={oldPasswordError}
                  />
                  <DwHideAndShowPass
                    margin="normal"
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    onChange={(e) => {
                      formik.setFieldValue("newPassword", e.target.value);
                    }}
                    autoComplete="newPassword"
                  />
                  <DwHideAndShowPass
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    onChange={(e) => {
                      formik.setFieldValue("confirmPassword", e.target.value);
                    }}
                    autoComplete="confirmPassword"
                  />
                  <Grid item xs={12}>
                    <MuiLoadingButtonTheme
                      buttonName={buttonName}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid container spacing={6} direction="row">
                    <Grid item>
                      <Button
                        color="inherit"
                        href="/login"
                        sx={{
                          fontSize: "0.75rem",
                          "&:hover": {
                            color: "blue",
                            background: "white",
                          },
                        }}
                      >
                        Go back?
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
  );
};

export default UpdatePasswordForm;
