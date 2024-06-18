import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { useReadUsersQuery } from "../../services/api/UserService";
import groupValidationSchema from "../../validation/groupValidation";
import DwInput from "../dwComponents/DwInput";
import DwSelect from "../dwComponents/DwSelect";
import { IFormValues, IGroup } from "../interfaces/GroupInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
interface Query {
  page?: number;
  limit?: number;
  role?: string;
  findQuery?: string;
  sort?: string[];
}

const GroupForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
  group = {},
}) => {
  const [query] = useState<Query>({
    page: 1,
    limit: 10,
    role: "teacher",
    findQuery: "",
    sort: [],
  });

  /* Teachers */
  const { data: datatReadTeachers } = useReadUsersQuery({
    ...query,
    sort: query.sort?.join(",") || "",
  });
  const teachers = (datatReadTeachers?.result?.results || []).map((value) => {
    // console.log(group.teacher?.fullName, "************name**************");

    return {
      value: value.id,
      label: value.fullName,
    };
  });

  /* Subjects */
  const { data: dataReadSubjects } = useReadSubjectsQuery({
    ...query,
    sort: query.sort?.join(","),
  });
  const subjects = (dataReadSubjects?.result?.results || []).map((value) => {
    return {
      value: value.id,
      label: value.subjectName,
    };
  });

  const groupInitialValues: IGroup = {
    subject: group.subject?.id || "",
    teacher: group.teacher?.id || "",
    groupName: group.groupName || "",
    startTime: group.startTime || "",
    endTime: group.endTime || "",
  };

  return (
    <div>
      <Formik
        initialValues={groupInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={groupValidationSchema}
        validateOnBlur={false}
      >
        {(formik: FormikProps<IGroup>) => {
          return (
            <Form>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 1,
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
                          name="groupName"
                          label="Group Name"
                          type="text"
                          fullWidth
                          onChange={(e) => {
                            formik.setFieldValue("groupName", e.target.value);
                          }}
                          autoFocus={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          name="teacher"
                          label="Teacher"
                          onChange={(e) => {
                            formik.setFieldValue("teacher", e.target.value);
                          }}
                          selectLabels={teachers}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          name="subject"
                          label="Subject"
                          onChange={(e) => {
                            formik.setFieldValue("subject", e.target.value);
                          }}
                          selectLabels={subjects}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={formik.values.startTime}
                          style={{ width: "100%" }}
                          onChange={(date: Date) => {
                            console.log("Start Time", date);
                            formik.setFieldValue("startTime", date);
                          }}
                          onBlur={() => {
                            formik.setFieldTouched("startTime", true); // Mark startTime field as touched on blur
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          customInput={
                            <TextField
                              fullWidth
                              style={{ width: "100%" }}
                              label="Start Time"
                              error={
                                formik.touched.startTime &&
                                Boolean(formik.errors.startTime)
                              }
                              helperText={
                                formik.touched.startTime &&
                                formik.errors.startTime
                                  ? formik.errors.startTime
                                  : ""
                              }
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={formik.values.endTime}
                          onChange={(date: Date) =>
                            formik.setFieldValue("endTime", date)
                          }
                          onBlur={() => {
                            formik.setFieldTouched("endTime", true); // Mark startTime field as touched on blur
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          customInput={
                            <TextField
                              fullWidth
                              label="End Time"
                              error={
                                formik.touched.endTime &&
                                Boolean(formik.errors.endTime)
                              }
                              helperText={
                                formik.touched.endTime && formik.errors.endTime
                                  ? formik.errors.endTime
                                  : ""
                              }
                            />
                          }
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
    </div>
  );
};

export default GroupForm;
