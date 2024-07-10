import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UseAttendance from "../../teacherComponent/attendanceComponents/UseAttendanceTable";
import ShowTeacherFeedbacks from "../../teacherComponent/teacherFeedback/ShowTeacherFeedbacks";
import TeacherDashboard from "../mycomponents/teacher/TeacherDashboard";
import TeacherFeedback from "../mycomponents/teacher/TeacherFeedback";
import TeacherMessages from "../mycomponents/teacher/TeacherMessages";
import TeacherReport from "../mycomponents/teacher/TeacherReport";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";

const TeacherRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<TeacherDashboard />} />
        <Route path=":id" element={<UseAttendance />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="messages" element={<TeacherMessages />} />
        {/* ------------------------ Feedbacks-------------------------- */}
        <Route path="feedback" element={<Outlet />}>
          <Route index element={<TeacherFeedback />} />
          <Route path=":id" element={<ShowTeacherFeedbacks />} />
        </Route>
        <Route path="report" element={<TeacherReport />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoute;
