import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useState } from "react";

interface DwPasswordProps {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

const DwHideAndShowPass: React.FC<DwPasswordProps> = ({
  name,
  label,
  onChange,
  ...props
}) => {
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
                type={showPassword ? "text" : "password"}
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
              {meta.error ? (
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
