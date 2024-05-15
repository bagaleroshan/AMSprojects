import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { Dispatch, SetStateAction } from "react";

interface IDwPasswordProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface IEndAdornment {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}
const DwHideAndShowPass: React.FC<IDwPasswordProps> = ({
  name,
  label,
  onChange,
  ...props
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState<false | true>(false);

  const EndAdornment: React.FC<IEndAdornment> = ({
    showPassword,
    setShowPassword,
  }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
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
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <EndAdornment
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
