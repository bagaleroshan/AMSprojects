import { Box, Typography } from "@mui/material";
import "../Style.css/TLogout.css";
import AdminSidebar from "./AdminSidebar";

const AAttendance = () => {
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <AdminSidebar />
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h2">Admin Attendance</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AAttendance;
