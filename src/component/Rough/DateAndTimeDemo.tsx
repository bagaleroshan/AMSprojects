import { DatePicker } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DateAndTimeDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formik = useFormik({
    initialValues: {
      selectedDate: null,
    },
    onSubmit: (values) => {
      console.log(values.selectedDate);
      // You can handle form submission here
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box maxWidth={400} mx="auto" mt={4}>
        <form onSubmit={formik.handleSubmit}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              formik.setFieldValue("selectedDate", date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button type="submit" variant="contained" color="primary" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default DateAndTimeDemo;
