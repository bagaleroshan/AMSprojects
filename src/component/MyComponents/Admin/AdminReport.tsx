<<<<<<< HEAD
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, FormControl, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import AdminGroupReport from "../../../adminComponent/AdminGroupReport";
import { useReadGroupQuery } from "../../../services/api/GroupService";
import DwSelect from "../../dwComponents/DwSelect";
=======
import { Box, Typography } from "@mui/material";
import AdminAttendanceReport from "../../../adminComponent/AdminAttendanceReport";
>>>>>>> c65230f164636b521b5f831a6bfc23a911cc677d

const AdminReport = () => {
  const [groupId, setGroupId] = useState("");
  const query = { page: 0, limit: 0, findQuery: "", sort: "" };
  const { data: dataAllGroups, isLoading: isLoadingAllGroups } =
    useReadGroupQuery(query);

  // console.log("dataAllGroups******", dataAllGroups?.result?.results);

  const allGroups = dataAllGroups?.result?.results || [];
  const groups = allGroups.map((value) => ({
    value: value.id,
    label: value.groupName,
  }));
  return (
    <>
      <div className="teacherReport">
        {/* <Box sx={{ display: "flex" }}> */}
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Attendance Report
        </Typography>
        <Box height={60} />
        {/* <AdminAttendanceReport /> */}
        <Formik initialValues={{ groupName: groups.groupName || "" }}>
          {(formik) => {
            return (
              <Form>
                <Stack display="flex" direction="row" spacing={10}>
                  <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                    <DwSelect
                      name="group"
                      label="Groups"
                      onChange={(e) => {
                        formik.setFieldValue("group", e.target.value);
                        setGroupId(e.target.value);
                        // console.log("groupId*************", e.target.value);
                      }}
                      selectLabels={groups}
                      isLoading={isLoadingAllGroups}
                    />
                  </FormControl>
                </Stack>
              </Form>
            );
          }}
        </Formik>
        <Box height={60} />
        {/* <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <Select value={age} onChange={handleChange} displayEmpty>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Addition Report Filters</MenuItem>
                <MenuItem value={20}>Nitan D1</MenuItem>
                <MenuItem value={30}>Nitan E1</MenuItem>
                <MenuItem value={30}>Nitan E12</MenuItem>
              </Select>
            </FormControl> */}
        <Box height={60} />
        
        {/* </Box> */}
        {/* </Box> */}
        <Box height={60} />
        {/* <Box>Hello</Box> */}
        <AdminGroupReport groupId={groupId} />
      </div>
    </>
  );
};
export default AdminReport;
