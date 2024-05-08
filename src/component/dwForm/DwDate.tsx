import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { Field, FieldProps } from "formik";
import React from "react";

interface DwDateProps {
  name: string;
  label: string;
  // value: Dayjs;
  onChange: (date: Dayjs | null) => void;
}

const DwDate: React.FC<DwDateProps> = ({ name, label, onChange, ...props }) => {
  return (
    <Field name={name}>
      {({ meta }: FieldProps) => {
        return (
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...props}
                name={name}
                label={label}
                onChange={onChange}
              />
            </LocalizationProvider>
            {meta.touched && meta.error ? (
              <div style={{ color: "red" }}>{meta.error}</div>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};
export default DwDate;
