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
import { userResetPasswordValidation } from "../../validation/userValidation";
import DwHideAndShowPass from "../dwForm/DwHideAndShowPass";
import { IUserFormValues, resetPasswordInitialValue } from "./UserInterface";

const ResetPasswordForm: React.FC<IUserFormValues> = ({
  buttonName = "SIGN UP",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  return (
    <>
      <Formik
        initialValues={resetPasswordInitialValue}
        onSubmit={onSubmit}
        innerRef={formikRef}
        validationSchema={userResetPasswordValidation}
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
                    {buttonName}
                  </Typography>
                  {/* Hidden username field for accessibility */}
                
                  <Box sx={{ mt: 1 }}>
                    <DwHideAndShowPass
                      margin="normal"
                      fullWidth
                      name="oldPassword"
                      label="Old Password"
                      onChange={(e) => {
                        formik.setFieldValue("oldPassword", e.target.value);
                      }}
                      autoComplete="oldPassword"
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
                          UPDATING....
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

export default ResetPasswordForm;
