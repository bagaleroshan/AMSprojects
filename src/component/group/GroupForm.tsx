import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { groupValidationSchema } from "../../validation/groupValidation";
import DwSelect from "../dwComponents/DwSelect";
import { IFormValues, IGroup } from "../interfaces/GroupInterface";

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
  const { data: dataReadSubjects } = useReadSubjectsQuery({
    ...query,
    sort: query.sort.join(","),
  });
  console.log("dataReadSubjects", dataReadSubjects);

  // const {
  //   isError: isErrorViewSpecific,
  //   data: dataReadSubjects,
  //   error: errorViewSpecific,
  // } = useReadSubjectsQuery({
  //   ...query,
  //   sort: query.sort.join(","),
  // });
  console.log("dataReadSubjects", dataReadSubjects?.result?.results);

  let subjects = (dataReadSubjects?.result?.results || []).map((value, i) => {
    return {
      value: value.id,
      label: value.subjectCode,
    };
  });

  console.log("**************", subjects);

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
