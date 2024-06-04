import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admindashboard">
      <Box sx={{ display: "flex" }}>
        <AdminSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={60} />
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default AdminLayout;
