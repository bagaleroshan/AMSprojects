import { TextField } from "@mui/material";
import { Field } from "formik";

const DwInput = ({ name, label, type, onChange, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
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
                variant="standard"
                // error={meta.touched}
                // helperText={meta.touched && meta.error}
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
