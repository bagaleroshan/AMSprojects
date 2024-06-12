import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { userValidation } from "../../validation/userValidation";
import DwInput from "../dwComponents/DwInput";
import DwSelect from "../dwComponents/DwSelect";
import {
  IUserFormValues,
  roles,
  userInitialValues,
} from "../interfaces/UserInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const CreateUserForm: React.FC<IUserFormValues> = ({
  buttonName = "CREATE",
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
        // to ensure validation is only triggered on form submission
        validateOnBlur={false}
      >
        {(formik) => {
          return (
            <Form>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <PersonAddAlt1Icon />
                  </Avatar>
                  <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    {buttonName}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
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
                          type="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => {
                            formik.setFieldValue("email", e.target.value);
                          }}
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
                        <DwSelect
                          name="role"
                          label="Role"
                          onChange={(e) => {
                            formik.setFieldValue("role", e.target.value);
                          }}
                          selectLabels={roles}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiLoadingButtonTheme
                          buttonName={buttonName}
                          isLoading={isLoading}
                        />
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

export default CreateUserForm;
