import { Box, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { IDwInputProps } from "./DwInterface";

const DwInput: React.FC<IDwInputProps> = ({
  name,
  label,
  type,
  onChange,
  multiline,
  isLoading,
  autofocus,
  ...props
}) => {
  // const handleKeyDown =
  // };
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
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
                id={name}
                name={name}
                label={label}
                type={type}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
                multiline={multiline}
                rows={5}
                color="primary"
                size="small"
                autoFocus={autofocus}
                disabled={isLoading}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  type === "number"
                    ? meta.value.length >= 10 &&
                      event.key !== "Backspace" &&
                      event.key !== "Tab"
                      ? event.preventDefault()
                      : null
                    : null;
                }}
              />
              {meta.touched && meta.error ? (
                <Typography style={{ fontSize: "0.8rem", color: "red" }}>
                  {meta.error}
                </Typography>
              ) : null}
            </Box>
          );
        }}
      </Field>
    </div>
  );
};
export default DwInput;
