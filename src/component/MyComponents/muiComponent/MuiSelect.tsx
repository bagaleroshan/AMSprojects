import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React from "react";
import { useReadGroupQuery } from "../../../services/api/GroupService";

const MuiSelect = () => {
  const [month, setMonth] = React.useState("3");

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };
  

  return (
    <>
      <Stack display="flex" direction="row" spacing={15}>
        <Box sx={{ minWidth: 120 }} component="div">
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

        {/* *****Group name ****** */}
        <Box sx={{ minWidth: 120 }} component="div">
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
    </>
  );
};

export default MuiSelect;

{
  /* <Box sx={{ minWidth: 170 }}>
          <FormControl fullWidth color="primary">
            <InputLabel id="demo-simple-select-label">SelectGroup</InputLabel>
            <DwSelect
              name="Select Group"
              label="Select Group"
              onChange={(e) => {
                formik.setFieldValue("subject", e.target.value);
              }}
              selectLabels={groups}
              isLoading={isLoading}
            />
          </FormControl>
        </Box> */
}
