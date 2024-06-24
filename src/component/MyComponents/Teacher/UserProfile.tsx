import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  return (
    <>
      <Box className="user-profile-container">
        <Box
          sx={{
            width: "50%",
            height: "75vh",
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
              sx={{ marginBottom: "0.5rem", width: "13%", height: "13%" }}
            ></Avatar>
            <Typography variant="h5">Dikshya Bhandari</Typography>
          </Box>
          <Box height={30} />
          <Box
            sx={{
              width: "80%",
              height: "45vh",
              backgroundColor: "#EEF8FF",
              margin: "auto",
              borderRadius: "15px",
              padding: "1rem",
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between'
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "35vh",
                marginLeft: "1rem",
              }}
            >
              <Typography>Email: dikshyabhandari05@gmail.com</Typography>
              <Typography>Full Name: Dikshya Bhandari</Typography>
              <Typography>Phone Number: 9867185036</Typography>
              <Typography>Role: Admin</Typography>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center'}}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ width: "100%" }}
              >
                Edit
              </Button>
             
            </Box>
            {/* <Box height={40}/>
          <Box sx={{display:'flex', justifyContent:'center', flexDirection:'row'}}>
           <Button variant="contained" startIcon={<EditIcon/>}>Edit</Button>
          </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
