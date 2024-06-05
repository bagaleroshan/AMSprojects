import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TeacherSideBar from "../mycomponents/teacher/TeacherSideBar";
import AdminSidebar from "../mycomponents/admin/AdminSidebar";

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
