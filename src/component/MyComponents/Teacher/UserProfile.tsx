import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Typography
} from "@mui/material";
import { LightTooltip } from "../../theme/MuiSidebarTheme";

const UserProfile = () => {
  return (
    <>
      <Box className="user-profile-container">
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="/deerwalk.png"
              sx={{ marginBottom: "0.5rem", width: "20%", height: "20%" }}
            ></Avatar>
            <Box height={20}/>
            <Typography variant="h5">Dikshya Bhandari</Typography>
          </Box>
          <Box height={10} />
          <Box
            sx={{
              width: "80%",
              height: "45vh",
              backgroundColor: "#EEF8FF",
              margin: "auto",
              borderRadius: "15px",
              padding: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginLeft: "1rem",
              }}
            >
              <Typography>Email: dikshyabhandari05@gmail.com</Typography>
              <Typography>Full Name: Dikshya Bhandari</Typography>
              <Typography>Phone Number: 9867185036</Typography>
              <Typography>Role: Admin</Typography>
            </Box>
            <Box>
              <LightTooltip title="Edit" placement="right">
                <EditIcon sx={{"&:hover":{color:'#1976D2'}}}/>
              </LightTooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
