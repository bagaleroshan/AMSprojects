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
          const { value, onChange: fieldOnChange } = field;
          const { touched, error } = meta;
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
                value={value}
                onChange={onChange || fieldOnChange}
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
              {touched && error && (
                <Typography
                  variant="body2"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          );
        }}
      </Field>
    </div>
  );
};

export default DwSelect;
