import { Box, Typography } from "@mui/material";

const WelcomePage = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        m: 30,
      }}
    >
      {/* <Paper
        elevation={10}
        variant="elevation"
        sx={{
          textAlign: "center",
          color: "primary",
          height: 60,
          lineHeight: "60px",
        }}
      > */}
      <Typography variant="h3">Welcome to Deerwalk Institute</Typography>
      {/* </Paper> */}
    </Box>
  );
};

export default WelcomePage;
