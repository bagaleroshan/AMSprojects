import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import TeacherDashboard from "../mycomponents/teacher/TeacherDashboard";
import TeacherMessages from "../mycomponents/teacher/TeacherMessages";
import TeacherReport from "../mycomponents/teacher/TeacherReport";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import { UseAttendanceTable } from "../../teacherComponent/attendanceComponents/UseAttendanceTable";
import StudentAttendanceTable from "../../teacherComponent/studentAttendance/StudentAttendanceTable";
import TeacherChangePassword from "../mycomponents/teacher/TeacherChangePassword";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<TeacherDashboard />} />
        {/* <Route path=":id" element={<UseAttendanceTable />} /> */}
        <Route path=":id" element={<StudentAttendanceTable />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path=":id" element={<UseAttendanceTable />} />
        {/* <Route path="update-password" element={<UpdatePassword />} /> */}
        <Route path="update-password" element={<TeacherChangePassword />} />

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
