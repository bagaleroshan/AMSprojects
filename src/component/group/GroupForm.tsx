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
import React, { useState } from "react";
import TimePicker from "react-time-picker"; // Import react-time-picker

import DwInput from "../dwComponents/DwInput";
import { IFormValues, IGroup } from "../interfaces/GroupInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
import { groupValidationSchema } from "../../validation/groupValidation";
import { useNavigate } from "react-router-dom";
import { IQuery } from "../../services/api/GroupService";

const GroupForm: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  group = {},
  formikRef = undefined,
  onSubmit = () => {},
}) => {
  const [query, setQuery] = useState<IQuery>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const [startTime, setStartTime] = useState(group.startTime || "");
  const [endTime, setEndTime] = useState(group.endTime || "");
  <select
    name="subject"
    id="subject"
    onChange={(e) => {
      formik.setFieldValue("subject", e.target.value);
    }}
  >
    {newData.map((subjectName, index) => (
      <option key={index} value={subjectName}>
        {subjectName}
      </option>
    ))}
  </select>;
  const groupInitialValues: IGroup = {
    subject: group.subject || "",
    teacher: group.teacher || "",
    groupName: group.groupName || "",
    students: group.students || "",
    startTime: group.startTime || "",
    endTime: group.endTime || "",
  };
  const navigate = useNavigate();
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
                        <select
                          style={{ width: "200px" }}
                          name="subject"
                          id="subject"
                          onChange={(e) => {
                            formik.setFieldValue("subject", e.target.value);
                          }}
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
                        <label htmlFor="startTime">Start Time</label>
                        <TimePicker
                          id="startTime"
                          value={startTime}
                          onChange={(val) => {
                            setStartTime(val);
                            formik.setFieldValue("startTime", val);
                          }}
                          disableClock={true}
                          clearIcon={null}
                          className="form-control"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <label htmlFor="endTime">End Time</label>
                        <TimePicker
                          id="endTime"
                          value={endTime}
                          onChange={(val) => {
                            setEndTime(val);
                            formik.setFieldValue("endTime", val);
                          }}
                          disableClock={true}
                          clearIcon={null}
                          className="form-control"
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
                            onClick={() => {
                              navigate("/admin/groups");
                            }}
                            sx={{
                              "&:hover": {
                                color: "blue",
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
