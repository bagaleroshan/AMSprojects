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
    limit: 0,
    role: "teacher",
    findQuery: "",
    sort: [],
  });

  /* Teachers */
  const { data: dataReadTeachers } = useReadUsersQuery({
    ...query,
    sort: query.sort?.join(",") || "",
  });
  const teachers = (dataReadTeachers?.result?.results || [])
    .filter((value) => value.role === "teacher")
    .map((value) => ({
      value: value.id,
      label: value.fullName,
    }));

  /* Subjects */
  const { data: dataReadSubjects } = useReadSubjectsQuery({
    ...query,
    limit: 0,
    sort: query.sort?.join(","),
  });
  const subjects = (dataReadSubjects?.result?.results || []).map((value) => ({
    value: value.id,
    label: value.subjectName,
  }));

  const groupInitialValues: IGroup = {
    subject: group.subject?.id || "",
    teacher: group.teacher?.id || "",
    groupName: group.groupName || "",
    startTime: group.startTime || "",
    duration: group.duration || "",
    endTime: group.endTime || "",
  };

  const handleDurationChange = (
    formik: FormikProps<IGroup>,
    duration: number,
    startTime: Date
  ) => {
    if (startTime) {
      const endTime = new Date(startTime.getTime() + duration * 60000);
      formik.setFieldValue("duration", duration);
      formik.setFieldValue("endTime", endTime);
    }
  };

  const formatTime = (date: Date) => {
    if (!date) return "";
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div>
      <Formik
        initialValues={groupInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={groupValidationSchema}
        validateOnBlur={true}
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
                          onChange={(date: Date) => {
                            formik.setFieldValue("startTime", date);
                            handleDurationChange(
                              formik,
                              formik.values.duration,
                              date
                            );
                          }}
                          onBlur={() => {
                            formik.setFieldTouched("startTime", true);
                          }}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={30}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          customInput={
                            <TextField
                              fullWidth
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
                        <DwSelect
                          name="duration"
                          label="Duration"
                          onChange={(e) => {
                            const duration = parseInt(e.target.value, 10);
                            handleDurationChange(
                              formik,
                              duration,
                              formik.values.startTime
                            );
                          }}
                          selectLabels={[
                            { value: 60, label: "1 hour" },
                            { value: 90, label: "1.5 hours" },
                            { value: 120, label: "2 hours" },
                            { value: 150, label: "2.5 hours" },
                            { value: 180, label: "3 hours" },
                            { value: 210, label: "3.5 hours" },
                            { value: 240, label: "4 hours" },
                            { value: 270, label: "4.5 hours" },
                            { value: 300, label: "5 hours" },
                            { value: 330, label: "5.5 hours" },
                            { value: 360, label: "6 hours" },
                            { value: 390, label: "6.5 hours" },
                            { value: 420, label: "7 hours" },
                            { value: 450, label: "7.5 hours" },
                            { value: 480, label: "8 hours" },
                            { value: 510, label: "8.5 hours" },
                            { value: 540, label: "9 hours" },
                            { value: 570, label: "9.5 hours" },
                            { value: 600, label: "10 hours" },
                          ]}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="End Time"
                          value={
                            formik.values.endTime
                              ? formatTime(new Date(formik.values.endTime))
                              : ""
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                          helperText={
                            formik.touched.endTime && formik.errors.endTime
                              ? formik.errors.endTime
                              : ""
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
