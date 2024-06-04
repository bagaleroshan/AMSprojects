import { Box, Button, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Style.css/TLogout.css";
import ASideBar from "./ASideBar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Subject from "./Subjects/Subject";
import { WidthFull } from "@mui/icons-material";
import AdminTabs from "./Subjects/AdminTabs";

const AForms = () => {
  
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex", width:'100%' }}>
          <ASideBar></ASideBar>
          <Box component="main" sx={{ flexGrow:1, p: 3 }}>
            <Box height={70} />
           <AdminTabs/>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AForms;
