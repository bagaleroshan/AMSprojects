import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useReadStudentsQuery } from "../../services/api/StudentApi";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { useReadUsersQuery } from "../../services/api/UserService";
import { groupValidationSchema } from "../../validation/groupValidation";
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

interface Student {
  id: string;
  email: string;
}

const GroupForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  group = {} as IGroup,
  formikRef = undefined,
  onSubmit = () => {},
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
  // console.log("datatReadTeachers", datatReadTeachers?.result?.results);
  const teachers = (datatReadTeachers?.result?.results || []).map((value) => {
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
  // console.log("dataReadSubjects", dataReadSubjects?.result?.results);
  const subjects = (dataReadSubjects?.result?.results || []).map((value) => {
    return {
      value: value.id,
      label: value.subjectName,
    };
  });

  /* Students */
  const { data: dataReadStudents } = useReadStudentsQuery({
    ...query,
    sort: query.sort?.join(","),
  });
  console.log("dataReadStudents", dataReadStudents?.result?.results);
  const students = (dataReadStudents?.result?.results || []).map(
    (value: Student) => {
      return {
        value: value.id,
        label: value.email,
      };
    }
  );

  const groupInitialValues: IGroup = {
    subject: "",
    teacher: "",
    groupName: "",
    students: "",
    startTime: "",
    endTime: "",
  };
  return (
    <div>
      <Formik
        initialValues={groupInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        validationSchema={groupValidationSchema}
        enableReinitialize={true}
        validateOnBlur={false}
      >
        {(formik) => {
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
                          autofocus={true}
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
                      <Grid item xs={12}>
                        <DwSelect
                          name="students"
                          label="Students"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "students",
                              e.target.value ? [e.target.value] : []
                            );
                          }}
                          selectLabels={students}
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
    </div>
  );
};

export default GroupForm;
