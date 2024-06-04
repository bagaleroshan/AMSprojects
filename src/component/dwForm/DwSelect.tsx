import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";

interface ISelectLabels {
  label: string;
  value: string;
}

interface IDwSelectProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
              {meta.touched && meta.error ? (
                <Typography
                  variant="body2"
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

export default DwSelect;
