import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Field, FieldProps } from "formik";

interface IRadioLabels {
  label: string;
  value: string;
}
interface IDwRadioProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioLabels: IRadioLabels[];
  [key: string]: unknown;
}

const DwRadio: React.FC<IDwRadioProps> = ({
  name,
  label,
  onChange,
  radioLabels,
  ...props
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: FieldProps) => {
          return (
            <div>
              <Box>
                <FormControl>
                  <FormLabel id={label}>{label}</FormLabel>
                  <RadioGroup
                    {...field}
                    {...props}
                    name={name}
                    value={meta.value}
                    onChange={onChange ? onChange : field.onChange}
                    aria-labelledby={label}
                    row
                  >
                    {radioLabels.map((item, i) => {
                      return (
                        <FormControlLabel
                          key={i}
                          control={<Radio size="small" color="primary" />}
                          label={item.label}
                          value={item.value}
                          checked={meta.value === item.value}
                        />
                      );
                    })}
                  </RadioGroup>
                  {meta.touched && meta.error ? (
                    <Typography
                      variant="body2"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {meta.error}
                    </Typography>
                  ) : null}
                </FormControl>
              </Box>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DwRadio;
