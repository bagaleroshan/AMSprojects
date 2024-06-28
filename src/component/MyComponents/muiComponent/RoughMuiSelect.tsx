import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useReadGroupQuery } from "../../../services/api/GroupService";
import DwSelect from "../../dwComponents/DwSelect";
import { IFormValues, IGroup } from "../../interfaces/GroupInterface";
// import groupValidationSchema from "../../validation/groupValidation";
// import DwSelect from "../dwComponents/DwSelect";
// import { IFormValues, IGroup } from "../interfaces/GroupInterface";

interface Query {
  page?: number;
  limit?: number;
  role?: string;
  findQuery?: string;
  sort?: string[];
}

const RoughMuiSelect: React.FC<IFormValues> = ({
  buttonName = "Create",
  isLoading = false,
  formikRef = undefined,
  onSubmit = () => {},
  group = {},
  setGroupId = () => {},
  setDate = () => {},
  groupId = "",
}) => {
  const [query] = useState<Query>({
    page: 1,
    limit: 0,
    role: "teacher",
    findQuery: "",
    sort: [],
  });

  /* group*/
  const { data: dataReadGroup } = useReadGroupQuery({
    ...query,
    limit: 0,
    sort: query.sort?.join(",") || "",
  });
  const SelectGroup = (dataReadGroup?.result?.results || []).map((value) => ({
    value: value.id,
    label: value.groupName,
  }));

  const groupInitialValues = {
    groupName: group.groupName || "",
    groups: "667ba81354acc6871dbcf0cf",
  };

  const [month, setMonth] = React.useState(`${new Date().getMonth() + 1}`);

  const joinYearMonth = () => {
    let thisYear = new Date().getFullYear();
    return `${thisYear}-${month}`;
  };
  setDate(joinYearMonth());

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  return (
    <div>
      <Formik
        initialValues={groupInitialValues}
        innerRef={formikRef}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validateOnBlur={true}
      >
        {(formik: FormikProps<IGroup>) => {
          return (
            <Form>
              <Stack display="flex" direction="row" spacing={5}>
                <Box sx={{ minWidth: 200 }} component="div">
                  <FormControl fullWidth color="primary">
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <DwSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="groups"
                      label="Group"
                      onChange={(e) => {
                        formik.setFieldValue("groups", e.target.value);
                        setGroupId(e.target.value);
                      }}
                      selectLabels={SelectGroup}
                      isLoading={isLoading}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 100 }} component="div">
                  <FormControl fullWidth color="primary">
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={month}
                      label="Month"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Jan</MenuItem>
                      <MenuItem value={2}>Feb</MenuItem>
                      <MenuItem value={3}>Mar</MenuItem>
                      <MenuItem value={4}>Apr</MenuItem>
                      <MenuItem value={5}>May</MenuItem>
                      <MenuItem value={6}>Jun</MenuItem>
                      <MenuItem value={7}>Jul</MenuItem>
                      <MenuItem value={8}>Aug</MenuItem>
                      <MenuItem value={9}>Sep</MenuItem>
                      <MenuItem value={10}>Oct</MenuItem>
                      <MenuItem value={11}>Nov</MenuItem>
                      <MenuItem value={12}>Dec</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RoughMuiSelect;
