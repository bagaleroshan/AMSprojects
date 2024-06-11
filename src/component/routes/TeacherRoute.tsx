import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import TeacherDashboard from "../MyComponents/Teacher/TeacherDashboard";
import TeacherMessages from "../MyComponents/Teacher/TeacherMessages";
import TeacherReport from "../MyComponents/Teacher/TeacherReport";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="messages" element={<TeacherMessages />} />
        <Route path="report" element={<TeacherReport />} />
        <Route path="*" element={<Navigate to="/teachers" replace />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
