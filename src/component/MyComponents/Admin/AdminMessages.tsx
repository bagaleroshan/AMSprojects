import { Box, Paper, Typography } from "@mui/material";

const AdminMessages = () => {
  return (
    <>
      {/* <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h2">Admin Messages</Typography>
          </Box>
        </Box>
      </div> */}
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
    </>
  );
};

export default AdminMessages;
