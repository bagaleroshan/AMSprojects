import { Box, Paper, Typography } from "@mui/material";

const AdminMessages = () => {
  return (
    <>
      <div className="teacherDashboard">
        {/* <Box sx={{display:"flex"}}>
          <Box component="main" sx={{flexGrow:1,p:3}}> */}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>New Student Requests</Typography>
      <Box height={60} />
      <Paper
        elevation={3}
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>There are no unread requests</Typography>
      </Paper>
      <Box height={30} />
      <Paper elevation={0} sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:'#E8E8E8'
        }}>
        <Typography sx={{color:'#505050'}}>
          [2024-04-20 01:56:29] Group:
          Dipan.S_Fundamental_of_Python_Apr_24_7_9_M1 has a new student Abhik
          Maharjan
        </Typography>
      </Paper>
      {/* </Box>
      </Box> */}
      </div>
    </>
  );
};

export default AdminMessages;
