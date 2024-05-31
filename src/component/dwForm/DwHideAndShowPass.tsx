import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";
import { IDwPasswordProps, IEndAdornmentProps } from "./DwInterface";

const EndAdornment: React.FC<IEndAdornmentProps> = ({
  showPassword,
  togglePasswordVisibility,
}) => (
  <InputAdornment position="end">
    <IconButton
      onClick={togglePasswordVisibility}
      sx={{ "&:hover": { color: "blue" } }}
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>
);

const DwHideAndShowPass: React.FC<IDwPasswordProps> = ({
  name,
  label,
  onChange,
  isLoading,
  autofocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  /* copy paste attempt */
  const [showMessage, setShowMessage] = useState(false);

  const handleCopyPasteAttempt = (
    event: React.ClipboardEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setShowMessage(true);
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            {...field}
            {...props}
            name={name}
            label={label}
            value={field.value}
            onChange={onChange ? onChange : field.onChange}
            color="primary"
            disabled={isLoading}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <EndAdornment
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              ),
            }}
            size="small"
            autoFocus={autofocus}
            onCopy={handleCopyPasteAttempt}
            onCut={(event) => event.preventDefault()}
            onPaste={handleCopyPasteAttempt}
          />
          <Snackbar
            open={showMessage}
            autoHideDuration={5000}
            onClose={handleCloseMessage}
          >
            <SnackbarContent
              style={{ backgroundColor: "#1863D6" }}
              message="Copy-paste operation is not allowed!"
            />
          </Snackbar>

          {meta.touched && meta.error ? (
            <Typography style={{ fontSize: "0.8rem", color: "red" }}>
              {meta.error}
            </Typography>
          ) : null}
        </Box>
      )}
    </Field>
  );
};

export default DwHideAndShowPass;
