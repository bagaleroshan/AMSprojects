import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminTabs from "./AdminTabs";

const AdminForm = () => {
  const [activeTab, setActiveTab] = useState("User");
  return (
    <>
      <div className="TLogout">
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h4"
              sx={{ paddingLeft: "3rem", fontWeight: "550" }}
            >
              {activeTab}
            </Typography>
            <Box height={30} />
            <AdminTabs onTabChange={(tab) => setActiveTab(tab)} />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminForm;
