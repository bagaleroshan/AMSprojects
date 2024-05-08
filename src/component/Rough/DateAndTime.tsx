import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Field } from "formik";

const DateAndTime = ({ name, label, onChange, ...props }) => {
  // console.log("Date and Time ", value.$d);
  return (
    <div>
      <Field name={name}>
        {() => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker {...props} label={label} onChange={onChange} />
            </LocalizationProvider>
          );
        }}
      </Field>
    </div>
  );
};

export default DateAndTime;
