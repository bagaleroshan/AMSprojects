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
  return (
    <>
      <div className="teacherReport">
       
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Attendance Report
            </Typography>
            <Box height={30} />
            <Stack display="flex" direction="row" spacing={10}>
             
            </Stack>
           
            <Box height={60} />
            <Stack display="flex" direction="row" spacing={10}>
             
             
             
            </Stack>
         
        <TeacherReportTable></TeacherReportTable>
      </div>
    </>
  );
};
export default TeacherReport;
