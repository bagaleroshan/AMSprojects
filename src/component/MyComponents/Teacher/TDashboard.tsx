import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Paper, Tab, Typography } from "@mui/material";
import React, { useState } from "react";

const TDashboard = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="teacherDashboard">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={60} />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Teacher Dashboard
            </Typography>
            <Box height={30} />

            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="Ongoing Courses" value="1" />
                  <Tab label="Completed Courses" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Paper elevation={2} sx={{ borderRadius: "10px" }}>
                  <Box sx={{ p: 2 }}>
                    <div className="TDashboardOngoingCourses">
                      <LocalLibraryOutlinedIcon
                        color="success"
                        fontSize="large"
                      />
                      <div className="TDashboardOngoingSubject">
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ familyWeight: "bold" }}
                        >
                          MERN-Full Stack MERN
                        </Typography>
                        <Box height={15} />
                        <Typography
                          variant="body2"
                          sx={{ familyWeight: "bold" }}
                        >
                          Group Name:
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ familyWeight: "bold" }}
                        >
                          Nitan.T_MERN_May_24_3_5_A1
                        </Typography>
                      </div>

                      <Button variant="contained" color="secondary">
                        Take Attendance
                      </Button>
                      <Typography
                        variant="body1"
                        sx={{ familyWeight: "bold", color: "#43a047" }}
                      >
                        Present:0
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{ familyWeight: "bold", color: "#e53935" }}
                      >
                        Absent:0
                      </Typography>
                      <Button variant="contained" color="error">
                        Mark As Complete
                      </Button>
                    </div>
                  </Box>
                </Paper>

                <Box height={10} />
                <Paper elevation={2} sx={{ borderRadius: "10px" }}>
                  <Box sx={{ p: 2 }}>
                    <div className="TDashboardOngoingCourses">
                      <LocalLibraryOutlinedIcon
                        color="success"
                        fontSize="large"
                      />
                      <div className="TDashboardOngoingSubject">
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ familyWeight: "bold" }}
                        >
                          MERN-Full Stack MERN
                        </Typography>
                        <Box height={15} />
                        <Typography
                          variant="body2"
                          sx={{ familyWeight: "bold" }}
                        >
                          Group Name:
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ familyWeight: "bold" }}
                        >
                          Nitan.T_MERN_May_24_3_5_A1
                        </Typography>
                      </div>

                      <Button variant="contained" color="secondary">
                        Take Attendance
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{ familyWeight: "bold", color: "#43a047" }}
                      >
                        Present:0
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ familyWeight: "bold", color: "#e53935" }}
                      >
                        Absent:0
                      </Typography>
                      <Button variant="contained" color="error">
                        Mark As Complete
                      </Button>
                    </div>
                  </Box>
                </Paper>
              </TabPanel>
              <TabPanel value="2">Completed Courses</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TDashboard;
