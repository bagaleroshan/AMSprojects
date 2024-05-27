import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";

interface IDwPasswordProps {
  name: string;
  label: string;
  type?: string; // Type is optional because it will be controlled internally
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
  isLoading?: boolean;
}

interface IEndAdornmentProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const EndAdornment: React.FC<IEndAdornmentProps> = ({
  showPassword,
  togglePasswordVisibility,
}) => (
  <InputAdornment position="end">
    <IconButton
      onClick={togglePasswordVisibility}
      sx={{ "&:hover": { color: "purple" } }}
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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            required
            color="secondary"
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
          />
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
