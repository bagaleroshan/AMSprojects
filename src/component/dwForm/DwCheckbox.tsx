import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";

interface IDwCheckboxProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) =>void;
  // multiline?: false;

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
                    color="primary"
                  />
                }
              ></FormControlLabel>
              {meta.touched && meta.error ? (
                <Typography
                  variant="body2"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
                  {meta.error}
                </Typography>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};
export default DwCheckbox;
