import { Box, Typography } from "@mui/material";
import UpdatePassword from "../../user/UpdatePassword";
// import UpdatePassword from "../user/UpdatePassword";

const TeacherChangePassword = () => {
  return (
    <>
      <div className="tChangePassword">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Change Password
            </Typography>
            <UpdatePassword />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TeacherChangePassword;
