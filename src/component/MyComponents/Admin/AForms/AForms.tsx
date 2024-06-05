import { Box, Typography } from "@mui/material";
import ASideBar from "../ASideBar";
import "../../Style.css/TLogout.css";
import AdminTabs from "./AdminTabs";
import { useState } from "react";

const AForms = () => {
const [activeTab, setActiveTab]=useState('User')
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex", width: "100%" }}>
          <ASideBar></ASideBar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box height={70} />
            <Typography variant="h4" sx={{paddingLeft:'3rem', fontWeight:'550'}}>{activeTab}</Typography>
            <Box height={30}/>
           <AdminTabs onTabChange={(tab)=>setActiveTab(tab)}/>

          </Box>
        </Box>
      </div>
    </>
  );
};

export default AForms;
