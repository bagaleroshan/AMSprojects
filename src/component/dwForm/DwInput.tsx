/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
interface IDwInputProps {
  name: string;
  label: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  [key: string]: unknown;
}
const DwInput: React.FC<IDwInputProps> = ({
  name,
  label,
  type,
  onChange,
  multiline = false,
  ...props
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          console.log(meta);
          return (
            <div>
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

export default DwInput;
