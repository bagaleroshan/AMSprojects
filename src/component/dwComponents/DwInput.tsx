import { Box, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { IDwInputProps } from "./DwInterface";

const DwInput: React.FC<IDwInputProps> = ({
  name,
  label,
  type,
  onChange,
  multiline,
  isPhoneNumber,
  isLoading,
  autofocus = false,
  ...props
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
          ) => {
            if (
              isPhoneNumber &&
              meta.value.length >= 10 &&
              event.key !== "Backspace" &&
              event.key !== "Tab"
            ) {
              event.preventDefault();
            }
          };
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
                label={label}
                type={type}
                value={field.value}
                onChange={onChange ? onChange : field.onChange}
                multiline={multiline}
                rows={multiline ? 5 : undefined}
                color="primary"
                size="small"
                autoFocus={meta.initialTouched ? false : autofocus}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   isPhoneNumber
                //     ? meta.value.length >= 10 &&
                //       event.key !== "Backspace" &&
                //       event.key !== "Tab"
                //       ? event.preventDefault()
                //       : null
                //     : null;
                // }}
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
