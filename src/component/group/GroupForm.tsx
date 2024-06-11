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

import DwInput from "../dwComponents/DwInput";
import { IFormValues, IGroup } from "../interfaces/GroupInterface";
import MuiLoadingButtonTheme from "../TableComponent/theme/MuiLoadingButtonTheme";

const GroupForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  group = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const groupInitialValues: IGroup = {
    // id: group?.id || "",
    subject: group?.subject || "",
    teacher: group?.teacher || "",
    groupName: group?.groupName || "",
    students: group?.students || "",
    startTime: group?.startTime || "",
    endTime: group?.endTime || "",
  };
  return (
    <div>
      <Formik
        initialValues={groupInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={groupValidationSchema}
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
                          name="subject"
                          label="Subject"
                          type="text"
                          fullWidth
                          id="subject"
                          onChange={(e) => {
                            formik.setFieldValue("subject", e.target.value);
                          }}
                          autofocus={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="teacher"
                          label="Teacher"
                          type="teacher"
                          onChange={(e) => {
                            formik.setFieldValue("teacher", e.target.value);
                          }}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="groupName"
                          label="Group Name"
                          type="groupName"
                          onChange={(e) => {
                            formik.setFieldValue("groupName", e.target.value);
                          }}
                          isPhoneNumber={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="students"
                          label="Students"
                          type="students"
                          onChange={(e) => {
                            formik.setFieldValue("students", e.target.value);
                          }}
                          isPhoneNumber={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="startTime"
                          label="Start Time"
                          type="startTime"
                          onChange={(e) => {
                            formik.setFieldValue("startTime", e.target.value);
                          }}
                          isPhoneNumber={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwInput
                          fullWidth
                          name="endTime"
                          label="End Time"
                          type="endTime"
                          onChange={(e) => {
                            formik.setFieldValue("endTime", e.target.value);
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
                            href="/admin/forms/group"
                            sx={{
                              "&:hover": {
                                color: "blue",
                                // background: "white",
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

export default GroupForm;
