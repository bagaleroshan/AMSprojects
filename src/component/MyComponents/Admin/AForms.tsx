import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Style.css/TLogout.css";
import AdminSidebar from "./AdminSidebar";

const AForms = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex" }}>
          <AdminSidebar />
          <Box component="main" sx={{ FlexGrow: 1, p: 3 }}>
            <Box height={70} />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Users{" "}
            </Typography>
            <Box height={30} />

            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  centered={false}
                >
                  <Tab label="Users" value="1" />

                  <Tab label="Students" value="2" />
                  <Tab label="Subjects" value="3" />
                  <Tab label="Groups" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">Panel One</TabPanel>
              <TabPanel value="2">Panel Two</TabPanel>
              <TabPanel value="3">
                <Typography
                  variant="h4"
                  sx={{
                    width: 100 + "%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Subject List
                </Typography>
              </TabPanel>
              <TabPanel value="4">Panel Four</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AForms;
