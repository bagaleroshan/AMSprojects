import { Checkbox, FormControlLabel } from "@mui/material";
import { Field, FieldProps } from "formik";

interface DwCheckboxProps {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: false;
}
const DwCheckbox = (props: DwCheckboxProps) => {
  return (
    <div>
      <Field name={props.name}>
        {({ field, meta }: FieldProps) => {
          return (
            <div>
              <FormControlLabel
                label={props.label}
                control={
                  <Checkbox
                    {...field}
                    {...props}
                    id={props.name}
                    checked={meta.value}
                    onChange={props.onChange ? props.onChange : field.onChange}
                    color="secondary"
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
