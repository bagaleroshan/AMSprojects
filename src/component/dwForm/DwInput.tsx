/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField } from "@mui/material";
import { Field, FieldProps } from "formik";

interface DwInputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: false;
}

const DwInput = (props: DwInputProps) => {
  return (
    <div>
      <Field name={props.name}>
        {({ field, meta }: FieldProps) => {
          return (
            <div>
              <TextField
                {...field}
                {...props}
                id={props.name}
                name={props.name}
                label={props.label}
                type={props.type}
                value={meta.value}
                onChange={props.onChange ? props.onChange : field.onChange}
                multiline={props.multiline}
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

