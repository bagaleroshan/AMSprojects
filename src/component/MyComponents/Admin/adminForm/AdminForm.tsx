import { Box, Typography, styled } from "@mui/material";
import AdminTabs from "./AdminTabs";
// import StudentTable from "../../../TableComponent/StudentTable";

const AdminForm = ({ firstTab, secondTab }) => {
  return (
    <>
      <div>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {" "}
          Recording Detail
        </Typography>
        {/* <Box height={20} /> */}
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <AdminTabs firstTab={firstTab} secondTab={secondTab} />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AdminForm;
