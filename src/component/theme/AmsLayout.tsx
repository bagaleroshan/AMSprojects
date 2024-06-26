import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AdminSidebar from "../MyComponents/Admin/AdminSidebar";
import TeacherSideBar from "../MyComponents/Teacher/TeacherSideBar";

const AmsLayout = ({ children }) => {
  const adminToken = useSelector((store: RootState) => store.user.adminToken);

  return (
    <div className="admindashboard">
      <Box sx={{ display: "flex" }}>
        {adminToken ? <AdminSidebar /> : <TeacherSideBar />}
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <Box height={60} />
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default AmsLayout;
