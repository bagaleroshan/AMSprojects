import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useState } from "react";

interface DwPasswordProps {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DwHideAndShowPass: React.FC<DwPasswordProps> = ({
  name,
  label,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const EndAdorment = ({ showPassword, setShowPassword }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
            <div>
              <TextField
                {...field}
                {...props}
                name={name}
                label={label}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
                required
                color="secondary"
                type={showPassword ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <EndAdorment
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  ),
                }}
                size="small"
              />
              {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DwHideAndShowPass;

{
  /* <FormControl variant="outlined" fullWidth>
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
            onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
    label={label}
    error={Boolean(form.errors[field.name] && form.touched[field.name])}
    helperText={
      form.errors[field.name] && form.touched[field.name]
        ? form.errors[field.name]
        : null
    }
  />
</FormControl>; */
}
