import { Box, Typography } from "@mui/material";

const AdminAttendance = () => {
  return (
    <>
      <div className="teacherDashboard">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{fontWeight:"bold"}}>Admin Attendance</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminAttendance;
