import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'
import AdminOngoingCourse from './AdminOngoingCourse';
import AdminCompletedCourse from './AdminCompletedCourse';


const AdminCourse = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="teacherDashboard">
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Attendance
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
                <AdminOngoingCourse/>
              </TabPanel>
              <TabPanel value="2">
                <AdminCompletedCourse/>
              </TabPanel>
            </TabContext>
          {/* </Box>
        </Box> */}
      </div>
    </>
  )
}

export default AdminCourse
