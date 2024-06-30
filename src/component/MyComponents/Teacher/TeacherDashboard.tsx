import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import CompletedCourses from "../../../teacherComponent/teacherDashboard/CompletedCourses";
import OngoingCourses from "../../../teacherComponent/teacherDashboard/OngoingCourses";

const TeacherDashboard = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="teacherDashboard">
        {/* <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Teacher Dashboard
            </Typography>
            <Box height={30} />

            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  // textColor="secondary"
                  // indicatorColor="secondary"
                >
                  <Tab label="Ongoing Courses" value="1" />
                  <Tab label="Completed Courses" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <OngoingCourses />
              </TabPanel>
              <TabPanel value="2">
                <CompletedCourses />
              </TabPanel>
            </TabContext>
          {/* </Box>
        </Box> */}
      </div>
    </>
  );
};

export default TeacherDashboard;
