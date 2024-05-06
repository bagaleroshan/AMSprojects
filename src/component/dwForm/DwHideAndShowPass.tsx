import React, { useState } from "react";
import { Field, FieldProps } from "formik";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps extends FieldProps {
  label: string;
}

const DwHideAndShowPass: PasswordFieldProps = ({ name, field, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   const handleMouseDownPassword = (
  //     event: React.MouseEvent<HTMLButtonElement>
  //   ) => {
  //     event.preventDefault();
  //   };
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor={field.name}>{label}</InputLabel>
              <OutlinedInput
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={label}
                error={Boolean(
                  form.errors[field.name] && form.touched[field.name]
                )}
                helperText={
                  form.errors[field.name] && form.touched[field.name]
                    ? form.errors[field.name]
                    : null
                }
              />
            </FormControl>
          );
        }}
      </Field>
    </div>
  );
};

export default DwHideAndShowPass;
