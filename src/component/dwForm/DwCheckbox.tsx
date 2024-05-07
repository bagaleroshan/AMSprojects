import { Checkbox, FormControlLabel } from "@mui/material";
import { Field, FieldProps } from "formik";

interface IDwCheckboxProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const DwCheckbox: React.FC<IDwCheckboxProps> = ({
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
              <FormControlLabel
                label={label}
                control={
                  <Checkbox
                    {...field}
                    {...props}
                    id={name}
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
