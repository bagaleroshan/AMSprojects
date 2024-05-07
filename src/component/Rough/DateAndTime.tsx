import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DateAndTimeProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  disabled?: boolean;
  params?: object;
}

const DateAndTime: React.FC<DateAndTimeProps> = ({
  value,
  onChange,
  label = "Date of Birth",
  disabled = false,
}) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} disabled={disabled} />}
      disableFuture
      openTo="year"
      views={["year", "month", "day"]}
      inputFormat="MM/dd/yyyy"
    />
  );
};

export default DateAndTime;
