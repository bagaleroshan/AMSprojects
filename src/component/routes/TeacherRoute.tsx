import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MyProfile from "../user/MyProfile";
// import ResetPassword from "../user/ResetPassword";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import TeacherDashboard from "../mycomponents/teacher/TeacherDashboard";
import TeacherMessages from "../mycomponents/teacher/TeacherMessages";
import TeacherReport from "../mycomponents/teacher/TeacherReport";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="update-password" element={<UpdatePassword />} />
        {/* <Route path="reset-password" element={<ResetPassword />} /> */}
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
