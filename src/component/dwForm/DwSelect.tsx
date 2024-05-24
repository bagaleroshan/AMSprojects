import { Box, MenuItem, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";

interface ISelectLabels {
  label: string;
  value: string;
}

interface IDwSelectProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
  selectLabels: ISelectLabels[];
}

const DwSelect: React.FC<IDwSelectProps> = ({
  name,
  label,
  onChange,
  selectLabels,
  ...props
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
            <div>
              <Box width="250px">
                <TextField
                  {...field}
                  {...props}
                  id={name}
                  value={meta.value}
                  onChange={onChange ? onChange : field.onChange}
                  label={label}
                  select
                  fullWidth
                  size="small"
                  color="secondary"
                >
                  {selectLabels.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Box>
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

export default DwSelect;
