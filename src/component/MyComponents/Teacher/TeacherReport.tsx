import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import TeacherReportTable from "./TeacherReportTable";

const TeacherReport = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <div className="teacherReport">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Attendance Report
        </Typography>
        <Box height={30} />
        {/* <Stack display="flex" direction="row" spacing={10}>
              <Typography variant="body2">Group</Typography>
             
            </Stack> */}

        {/* <Stack
          display="flex"
          direction="row"
          spacing={10}
          justifyContent="flex-end"
        >
          <Button variant="contained">Download</Button>
        </Stack> */}
        <Box height={60} />

        <TeacherReportTable></TeacherReportTable>
      </div>
    </>
  );
};
export default TeacherReport;
