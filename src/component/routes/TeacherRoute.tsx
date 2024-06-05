import { Outlet, Route, Routes } from "react-router-dom";
import TDashboard from "../mycomponents/teacher/TDashboard";
import TMessages from "../mycomponents/teacher/TMessages";
import TReport from "../mycomponents/teacher/TReport";
import MyProfile from "../user/MyProfile";
// import ResetPassword from "../user/ResetPassword";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import TRoutes from "../mycomponents/teacher/TRoutes";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<TDashboard />} />
        <Route path="update-password" element={<UpdatePassword />} />
        {/* <Route path="reset-password" element={<ResetPassword />} /> */}
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="messages" element={<TMessages />} />
        <Route path="report" element={<TReport />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
