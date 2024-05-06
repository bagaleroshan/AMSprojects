import { Checkbox, FormControlLabel } from "@mui/material";
import { Field } from "formik";

const DwCheckbox = ({ name, label, onChange, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          console.log(meta);
          return (
            <div>
              <FormControlLabel
                label={label}
                control={
                  <Checkbox
                    {...field}
                    {...props}
                    id={name}
                    type="checkbox"
                    checked={meta.value}
                    onChange={onChange ? onChange : field.onChange}
                  />
                }
              ></FormControlLabel>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DwCheckbox;
