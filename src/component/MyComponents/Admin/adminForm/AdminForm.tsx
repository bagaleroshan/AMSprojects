import { Box, Typography, styled } from "@mui/material";
import AdminTabs from "./AdminTabs";
// import StudentTable from "../../../TableComponent/StudentTable";

const AdminForm = ({ firstTab, secondTab }) => {
  return (
    <>
      <div className="teacherDashboard">
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Recording Detail
            </Typography>

            <AdminTabs firstTab={firstTab} secondTab={secondTab} />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminForm;
