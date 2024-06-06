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
import { validationSchema } from "../../validation/subjectValidation";
import DwInput from "../dwComponents/DwInput";
import { IFormValues, ISubject } from "../interfaces/SubjectInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

const SubjectForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  subject = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const initialValues: ISubject = {
    subjectName: subject?.subjectName || "",
    subjectCode: subject?.subjectCode || "",
    numberOfClasses: subject?.numberOfClasses || "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
                    <LockOutlinedIcon />
                  </Avatar>

                  <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    {buttonName}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DwInput
                          name="subjectName"
                          label="Subject Name"
                          type="text"
                          fullWidth
                          id="subjectName"
                          onChange={(e) => {
                            formik.setFieldValue("subjectName", e.target.value);
                          }}
                          autofocus={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="subjectCode"
                          label="Subject Code"
                          type="text"
                          onChange={(e) => {
                            formik.setFieldValue("subjectCode", e.target.value);
                          }}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="numberOfClasses"
                          label="No.of Classes"
                          type="number"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "numberOfClasses",
                              e.target.value
                            );
                          }}
                          isLoading={isLoading}
                          // isPhoneNumber={true}
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
                            href="/admin/forms/subjects"
                            sx={{
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
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SubjectForm;

/* 
<Form>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Update Subject
              </Typography>
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ marginTop: "10px", padding: "16px" }}
              >
                <DwInput
                  name="subjectName"
                  label="Subject Name"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("subjectName", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="subjectCode"
                  label="Subject Code"
                  type="text"
                  onChange={(e) => {
                    formik.setFieldValue("subjectCode", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <DwInput
                  name="numberOfClasses"
                  label="No.of Classes"
                  type="number"
                  onChange={(e) => {
                    formik.setFieldValue("numberOfClasses", e.target.value);
                  }}
                  isLoading={isLoading}
                ></DwInput>

                <Grid item xs={12}>
                  <MuiLoadingButtonTheme
                    buttonName={buttonName}
                    isLoading={isLoading}
                  />
                </Grid>
              </Stack>
            </Form>
*/
