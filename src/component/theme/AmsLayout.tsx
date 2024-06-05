import { Box } from "@mui/material";
import AdminSidebar from "../MyComponents/Admin/AdminSidebar";
import { useSelector } from "react-redux";
import TeacherSideBar from "../MyComponents/Teacher/TeacherSideBar";
import { RootState } from "../../store/store";

const AmsLayout = ({ children }) => {
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  //   const teachersToken = useSelector(
  //     (store: RootState) => store.user.teachersToken
  //   );
  return (
    <div className="admindashboard">
      <Box sx={{ display: "flex" }}>
        {adminToken ? <AdminSidebar /> : <TeacherSideBar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box height={60} />
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default AmsLayout;
