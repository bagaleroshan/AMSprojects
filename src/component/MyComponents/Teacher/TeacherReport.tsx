import { Box, Stack, Typography } from "@mui/material";
import TeacherReportTable from "./TeacherReportTable";

const TeacherReport = () => {
  return (
    <>
      <div className="teacherReport">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Attendance Report
        </Typography>
        <Box height={30} />
        <Stack display="flex" direction="row" spacing={10}></Stack>

        <Box height={60} />
        <Stack display="flex" direction="row" spacing={10}></Stack>

        <TeacherReportTable />
      </div>
    </>
  );
};
export default TeacherReport;
