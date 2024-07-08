import {
  Box,
  FormControl,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import AdminGroupReport from "../../../adminComponent/AdminGroupReport";
import DwSelect from "../../dwComponents/DwSelect";
import { useReadGroupQuery } from "../../../services/api/GroupService";

const AdminReport = () => {
  const [groupId, setGroupId] = useState("");
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
      <Box height={60} />

      <Formik initialValues={{ group: "" }}>
        {(formik) => (
          <Form>
            <Stack display="flex" direction="row" spacing={10}>
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
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
      <AdminGroupReport groupId={groupId} />
    </div>
  );
};

export default AdminReport;
