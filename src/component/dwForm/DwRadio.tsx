import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field, FieldProps } from "formik";

interface RadioLabels {
  label: string;
  value: string;
}
interface DwRadioProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
  radioLabels: RadioLabels[];
}

const DwRadio: React.FC<DwRadioProps> = ({
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
                          control={<Radio size="small" color="secondary" />}
                          label={item.label}
                          value={item.value}
                          checked={meta.value === item.value}
                        />
                      );
                    })}
                  </RadioGroup>
                  {meta.touched && meta.error ? (
                    <div style={{ color: "red" }}>{meta.error}</div>
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
