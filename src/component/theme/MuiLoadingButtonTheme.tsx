import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        // circularProgress: {
        //   color: "#ffffff", // Bright white color for the loading indicator
        // },
        root: {
          "& .MuiCircularProgress-root": {
            color: "#ffffff", // Bright white color for the CircularProgress
          },
        },
      },
    },
  },
});

const MuiLoadingButtonTheme: React.FC<{
  isLoading?: boolean;
  buttonName?: string;
}> = ({ isLoading = true, buttonName = "Submit" }) => {
  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <LoadingButton
          loading
          endIcon={<SendIcon />}
          loadingPosition="end"
          type="submit"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            mt: 3,
            mb: 2,
            "& .MuiButton-label": {
              color: "white", // Text color when not loading
            },
            "& .MuiCircularProgress-root": {
              color: "white", // Bright white color for the CircularProgress
            },
          }}
          fullWidth
        >
          LOADING .....
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonName}
        </Button>
      )}
    </ThemeProvider>
  );
};

export default MuiLoadingButtonTheme;
