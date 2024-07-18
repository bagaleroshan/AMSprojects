import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Stack
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import DwSelect from "../../../dwComponents/DwSelect";
import AdminGroupReport from "../../../../adminComponent/AdminGroupReport";
import { useReadGroupQuery } from "../../../../services/api/GroupService";
import AdminAttendance from "../AdminAttendance";

const AdminReport = () => {
  const [groupId, setGroupId] = useState("asdada");
  const query = { page: 0, limit: 0, findQuery: "", sort: "" };
  const { data: dataAllGroups, isLoading: isLoadingAllGroups } =
    useReadGroupQuery(query);

  const allGroups = dataAllGroups?.result?.results || [];
  const groups = allGroups.map((value) => ({
    value: value.id,
    label: value.groupName,
  }));
   


  return (
    <div className="teacherReport">
      <h1>Take Attendance </h1>
      <Box height={60} />
      <Formik initialValues={{ group: "" }}>
        {(formik) => (
          <Form>
            <Stack display="flex" direction="row" spacing={10}>
              <FormControl sx={{ m: 1, minWidth: 400 ,p:4}} size="small">
                {isLoadingAllGroups ? (
                  <CircularProgress />
                ) : (
                  <DwSelect
                    name="group"
                    label="Groups"
                    onChange={(e) => {
                      formik.setFieldValue("group", e.target.value);
                      setGroupId(e.target.value);
                    }}
                    selectLabels={groups}
                    isLoading={isLoadingAllGroups}
                    
                  />
                )}
              </FormControl>
            </Stack>
          </Form>
        )}
      </Formik>

      <Box height={60} />
      <AdminAttendance id={groupId} />
    </div>
  );
};

export default AdminReport;
