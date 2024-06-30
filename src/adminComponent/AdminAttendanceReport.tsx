import { FormControl, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import DwSelect from "../component/dwComponents/DwSelect";
import { useReadGroupQuery } from "../services/api/GroupService";

const AdminAttendanceReport = () => {
  const query = { page: 0, limit: 0, findQuery: "", sort: "" };
  const { data: dataAllGroups, isLoading: isLoadingAllGroups } =
    useReadGroupQuery(query);

  console.log("dataAllGroups******", dataAllGroups?.result?.results);

  const allGroups = dataAllGroups?.result?.results || [];
  const groups = allGroups.map((value) => ({
    value: value.id,
    label: value.groupName,
  }));

  return (
    <div>
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
                      console.log(e.target.value);
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
    </div>
  );
};

export default AdminAttendanceReport;
