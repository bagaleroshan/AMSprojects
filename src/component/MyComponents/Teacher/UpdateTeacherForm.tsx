import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { myProfileUpdateValidation } from "../../../validation/userValidation";
import DwInput from "../../dwComponents/DwInput";
import { IUser, IUserFormValues } from "../../interfaces/UserInterface";
import MuiLoadingButtonTheme from "../../theme/MuiLoadingButtonTheme";
// import { RootState } from "../../store/store";

const UpdateTeacherForm: React.FC<IUserFormValues> = ({
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

  const href = "/admin/users/";

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
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <AccountBoxIcon />
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
                          id="firstName"
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
                          <Button
                            color="inherit"
                            href={href}
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

export default UpdateTeacherForm;
