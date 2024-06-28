import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import TeacherDashboard from "../MyComponents/Teacher/TeacherDashboard";
import TeacherMessages from "../MyComponents/Teacher/TeacherMessages";
import TeacherReport from "../MyComponents/Teacher/TeacherReport";
import MyProfile from "../user/MyProfile";
import UpdateProfile from "../user/UpdateProfile";
import { UseAttendanceTable } from "../../teacherComponent/attendanceComponents/UseAttendanceTable";
import StudentAttendanceTable from "../../teacherComponent/studentAttendance/StudentAttendanceTable";
import TeacherChangePassword from "../MyComponents/Teacher/TeacherChangePassword";
import UpdatePassword from "../user/UpdatePassword";
import TeacherFeedback from "../MyComponents/Teacher/TeacherFeedback";

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
        <Route path="feedback" element={<TeacherFeedback />} />
        <Route path="report" element={<TeacherReport />} />
        <Route path="*" element={<Navigate to="/teachers" replace />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
