import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { myProfileUpdateValidation } from "../../validation/userValidation";
import DwInput from "../dwForm/DwInput";
import { IUser, IUserFormValues } from "./UserInterface";

const UpdateProfileForm: React.FC<IUserFormValues> = ({
  buttonName = "Update Profile",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
  user = {},
}) => {
  const userInitialValues: IUser = {
    fullName: user.fullName || "",
    phoneNumber: user.phoneNumber || "",
  };
  return (
    <>
      <Formik
        initialValues={userInitialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
        validationSchema={myProfileUpdateValidation}
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
                  {/* {token ? null : (
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                  )} */}

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
                          id="firstName"
                          onChange={(e) => {
                            formik.setFieldValue("fullName", e.target.value);
                          }}
                          autofocus={true}
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
                        />
                      </Grid>
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
                            SIGNING UP....
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

                      <Grid container justifyContent="center">
                        <Grid item>
                          <Button
                            color="inherit"
                            href="/users/my-profile"
                            sx={{
                              "&:hover": {
                                color: "blue",
                                background: "white",
                              },
                            }}
                          >
                            Go Back?
                          </Button>
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

export default UpdateProfileForm;
