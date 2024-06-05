import { Box, Typography } from "@mui/material";

const AMessages = () => {
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h2">Admin Messages</Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AMessages;
