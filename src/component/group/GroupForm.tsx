import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TimePicker from "react-time-picker";
import DwInput from "../dwComponents/DwInput";
import { groupValidationSchema } from "../../validation/groupValidation";

import { IFormValues, IGroup } from "../interfaces/GroupInterface";
import { useReadStudentsQuery } from "../../services/api/StudentApi";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { useReadUsersQuery } from "../../services/api/UserService";
import DwSelect from "../dwComponents/DwSelect";
import { IQuery } from "../../services/api/GroupService";

const GroupForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  group = {} as IGroup,
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });
  const { data: dataReadSubjects } = useReadSubjectsQuery({
    ...query,
    sort: query.sort.join(","),
  });
  const subjects = dataReadSubjects?.result || {};
  console.log("dataReadSubjects", dataReadSubjects);

  // const [subjects, setSubjects] = useState<string[]>([]);
  // const [teachers, setTeachers] = useState<string[]>([]);
  // const [students, setStudents] = useState<string[]>([]);

  // const { data: subjectsData } = useReadSubjectsQuery({
  //   page: 1,
  //   limit: 100,
  // } as IQuery);
  // const { data: teachersData } = useReadUsersQuery({
  //   page: 1,
  //   limit: 100,
  // } as IQuery);
  // const { data: studentsData } = useReadStudentsQuery({
  //   page: 1,
  //   limit: 100,
  // } as IQuery);

  // useEffect(() => {
  //   if (subjectsData) {
  //     setSubjects(
  //       subjectsData.result.results.map(
  //         (value: { subjectName: string }) => value.subjectName
  //       )
  //     );
  //   }
  // }, [subjectsData]);

  // useEffect(() => {
  //   if (teachersData) {
  //     setTeachers(
  //       teachersData.result.results.map(
  //         (value: { teacherName: string }) => value.teacherName
  //       )
  //     );
  //   }
  // }, [teachersData]);

  // useEffect(() => {
  //   if (studentsData) {
  //     setStudents(
  //       studentsData.result.results.map(
  //         (value: { studentName: string }) => value.studentName
  //       )
  //     );
  //   }
  // }, [studentsData]);

  // const [startTime, setStartTime] = useState<string>(group.startTime || "");
  // const [endTime, setEndTime] = useState<string>(group.endTime || "");

  const groupInitialValues: IGroup = {
    subject: group.subject || "",
    teacher: group.teacher || "",
    groupName: group.groupName || "",
    students: group.students || "",
    startTime: group.startTime || "",
    endTime: group.endTime || "",
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
                        <DwSelect
                          style={{ width: "200px" }}
                          name="Subjects"
                          id="subject"
                          onChange={(e) => {
                            formik.setFieldValue("subject", e.target.value);
                          }}
                          selectLabels={subjects}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <DwSelect
                          style={{ width: "200px" }}
                          name="teacher"
                          id="teacher"
                          onChange={(e) => {
                            formik.setFieldValue("teacher", e.target.value);
                          }}
                        >
                          {teachers.map((teacherName, index) => (
                            <option key={index} value={teacherName}>
                              {teacherName}
                            </option>
                          ))}
                        </DwSelect>
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          style={{ width: "200px" }}
                          name="students"
                          id="students"
                          onChange={(e) => {
                            formik.setFieldValue("students", e.target.value);
                          }}
                        >
                          {students.map((studentName, index) => (
                            <option key={index} value={studentName}>
                              {studentName}
                            </option>
                          ))}
                        </DwSelect>
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
                        <label htmlFor="startTime">Start Time</label>
                        <TimePicker
                          id="startTime"
                          value={startTime}
                          onChange={(value: string) => {
                            setStartTime(value);
                            formik.setFieldValue("startTime", value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <label htmlFor="endTime">End Time</label>
                        <TimePicker
                          id="endTime"
                          value={endTime}
                          onChange={(value: string) => {
                            setEndTime(value);
                            formik.setFieldValue("endTime", value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={isLoading}
                        >
                          {buttonName}
                        </Button>
                      </Grid> */}
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
