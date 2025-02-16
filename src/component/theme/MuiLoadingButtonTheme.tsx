import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, ThemeProvider, colors, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiLoadingButton: {
      styleOverrides: {
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
  type?: "button" | "submit";
  onClick?: () => void;
}> = ({
  isLoading = true,
  type = "submit",
  buttonName = "Submit",
  onClick = () => {},
}) => {
  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <LoadingButton
          loading
          endIcon={<SendIcon />}
          loadingPosition="end"
          type={type}
          sx={{
            backgroundColor: "primary.main",
            mt: 3,
            mb: 2,
            '& .MuiLoadingButton-loadingIndicator': {
              color: '#ffffff', 
            },
            '& .MuiButton-root': {
              color: 'white', 
            },
            '& .MuiLoadingButton-root': {
              color: 'white', 
            },
          }}
          fullWidth
        >
          <span style={{color:'white', }}>Loading </span>
        </LoadingButton>
      ) : (
        <Button
          type={type}
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClick}
        >
          {buttonName}
        </Button>
      )}
    </ThemeProvider>
  );
};

export default MuiLoadingButtonTheme;
