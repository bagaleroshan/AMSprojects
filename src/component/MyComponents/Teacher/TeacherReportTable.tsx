import React, { useState } from "react";
import { useReadGroupsByTeacherIdQuery } from "../../../services/api/TeacherService";
import { Form, Formik } from "formik";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Button,
  FormControl,
  Stack,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import DwSelect from "../../dwComponents/DwSelect";
import UseTeacherReportTable from "./UseTeacherReportTable";

const TeacherReportTable = () => {
  const {
    data,
    isLoading: isLoadingAllGroups,
    error,
  } = useReadGroupsByTeacherIdQuery("");
  const [selectedGroupId, setSelectedGroupId] = useState("jsjadgsa");

  const teachersGroups = data?.result?.results;
  const options = teachersGroups?.map((value) => ({
    label: value.groupName,
    value: value.id,
  }));

  if (isLoadingAllGroups) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load groups</Typography>;
  }

  return (
    <>
      <div>
        <Formik initialValues={{ groupName: "" }}>
          {(formik) => (
            <Form>
              <Stack
                display="flex"
                direction="row"
                justifyContent="space-between"
              >
                <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                  <DwSelect
                    name="group"
                    label="Groups"
                    onChange={(e) => {
                      formik.setFieldValue("group", e.target.value);
                      setSelectedGroupId(e.target.value);
                    }}
                    selectLabels={options}
                    isLoading={isLoadingAllGroups}
                  />
                </FormControl>
                <Button variant="contained" sx={{height:'40px'}} startIcon={<ArrowDownwardIcon/>}>Download</Button>
              </Stack>
              <Box height={5} />
              <Stack display="flex" direction="row" spacing={10}>
                {/* Other form controls can go here */}
              </Stack>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        {selectedGroupId ? (
          <UseTeacherReportTable groupId={selectedGroupId} />
        ) : (
          <Typography>Select a group to view the report</Typography>
        )}
      </div>
    </>
  );
};

export default TeacherReportTable;
