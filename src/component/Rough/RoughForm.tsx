import React, { useState } from "react";
import { Container } from "@mui/material";
import DateAndTime from "./DateAndTime";

const RoughForm: React.FC = () => {
  const [dob, setDOB] = useState<Date | null>(null);

  const handleDOBChange = (date: Date | null) => {
    setDOB(date);
  };

  return (
    <Container maxWidth="md">
      <DateAndTime value={dob} onChange={handleDOBChange} />
    </Container>
  );
};

export default RoughForm;
