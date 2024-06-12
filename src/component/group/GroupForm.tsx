import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { groupValidationSchema } from "../../validation/groupValidation";
import DwSelect from "../dwComponents/DwSelect";
import { IFormValues, IGroup } from "../interfaces/GroupInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
import DwInput from "../dwComponents/DwInput";
import { useReadUsersQuery } from "../../services/api/UserService";

interface Query {
  page?: number;
  limit?: number;
  findQuery?: string;
  sort?: string[];
}

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
  /* Subjects */
  const { data: dataReadSubjects } = useReadSubjectsQuery({
    ...query,
    sort: query.sort.join(","),
  });
  // console.log("dataReadSubjects", dataReadSubjects?.result?.results);

  /* Teachers */
  const { data: datatReadUsers } = useReadUsersQuery({
    ...query,
    sort: query.sort.join(","),
  });

  let subjects = (dataReadSubjects?.result?.results || []).map((value) => {
    return {
      value: value.id,
      label: value.subjectName,
    };
  });
  let users = (datatReadUsers?.result?.results || []).map((value) => {
    return {
      value: value.id,
      label: value.subjectName,
    };
  });

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
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <DwInput
                          name="groupName"
                          label="Group Name"
                          type="text"
                          fullWidth
                          id="groupName"
                          onChange={(e) => {
                            formik.setFieldValue("groupName", e.target.value);
                          }}
                          autofocus={true}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          name="Subjects"
                          label="Subjects"
                          onChange={(e) => {
                            formik.setFieldValue("subject", e.target.value);
                          }}
                          selectLabels={subjects}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DwSelect
                          name="teacher"
                          label="Teacher"
                          onChange={(e) => {
                            formik.setFieldValue("teacher", e.target.value);
                          }}
                          selectLabels={users}
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
