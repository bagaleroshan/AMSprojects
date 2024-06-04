import { Outlet, Route, Routes } from "react-router-dom";
import MyProfile from "../user/MyProfile";
import ResetPassword from "../user/ResetPassword";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import TDashboard from "../MyComponents/Teacher/TDashboard";
import TRoutes from "../MyComponents/Teacher/TRoutes";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<div><TRoutes></TRoutes></div>} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
