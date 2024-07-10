import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import TeacherCompletedFeedback from "../../../teacherComponent/teacherFeedback/TeacherCompletedFeedback";
import TeacherOngoingFeedback from "../../../teacherComponent/teacherFeedback/TeacherOngoingFeedback";

const TeacherFeedback = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="teacherDashboard">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Feedback
        </Typography>
        <Box height={30} />

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Ongoing Classes" value="1" />
              <Tab label="Completed Classes" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TeacherOngoingFeedback />
          </TabPanel>
          <TabPanel value="2">
            <TeacherCompletedFeedback />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default TeacherFeedback;
