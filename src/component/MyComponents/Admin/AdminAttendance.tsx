import { Box, Typography } from "@mui/material";

const AdminAttendance = () => {
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h2">Admin Attendance</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminAttendance;
