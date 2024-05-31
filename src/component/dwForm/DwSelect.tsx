import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { IDwSelectProps } from "./DwInterface";

const DwSelect: React.FC<IDwSelectProps> = ({
  name,
  label,
  onChange,
  selectLabels,
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
                label={label}
                value={meta.value}
                onChange={onChange ? onChange : field.onChange}
                select
                fullWidth
                size="small"
                color="primary"
                disabled={isLoading}
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
