import { Box, Typography } from "@mui/material";
import "../Style.css/TLogout.css";

const AdminChangePassword = () => {
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h2">Admin ChangePassword</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminChangePassword;
