import { Box, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";

interface IDwInputProps {
  name: string;
  label: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: false;
  [key: string]: unknown;
  isLoading?: boolean;
}
const DwInput: React.FC<IDwInputProps> = ({
  name,
  label,
  type,
  onChange,
  multiline,
  isLoading,
  ...props
}) => {
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
                color="secondary"
                size="small"
                disabled={isLoading}
              />
              {meta.touched && meta.error ? (
                <Typography
                  // variant="body2"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
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
