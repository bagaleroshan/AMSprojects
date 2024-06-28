import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { UseAttendanceTable } from "../../teacherComponent/attendanceComponents/UseAttendanceTable";
import AdminForm from "../MyComponents/Admin/adminForm/AdminForm";
import AdminCourse from "../MyComponents/Admin/admincourse/AdminCourse";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
import AdminMessages from "../MyComponents/Admin/AdminMessages";
import AdminReport from "../MyComponents/Admin/AdminReport";
import ReadSpecificStudent from "../Student/ReadSpecificStudent";
import UpdateStudent from "../Student/UpdateStudent";
import ReadSpecificGroup from "../group/ReadSpecificGroup";
import UpdateGroup from "../group/UpdateGroup";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import UpdateSubject from "../subject/UpdateSubject";
import UpdateTeacher from "../teacher/UpdateTeacher";
import MyProfile from "../user/MyProfile";
import ReadSpecificUser from "../user/ReadSpecificUser";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import AdminFeedback from "../MyComponents/Admin/AdminFeedback";
const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<AdminDashboard />} />

        {/* ------------------- Users -------------------------------- */}
        <Route path="users" element={<Outlet />}>
          <Route
            index
            element={<AdminForm firstTab="users" secondTab="userList" />}
          />
          <Route
            path="create"
            element={<AdminForm firstTab="users" secondTab="create" />}
          />
          <Route path="update/:id" element={<UpdateTeacher />} />
          <Route path=":id" element={<ReadSpecificUser />} />
        </Route>
        {/* ---------------- Students------------------------------ */}
        <Route path="students" element={<Outlet />}>
          <Route
            index
            element={<AdminForm firstTab="students" secondTab="studentList" />}
          />
          <Route
            path="create"
            element={<AdminForm firstTab="students" secondTab="create" />}
          />
          <Route path="update/:id" element={<UpdateStudent />} />
          <Route path=":id" element={<ReadSpecificStudent />} />
        </Route>
        {/* --------------- Subjects------------------------------------ */}
        <Route path="subjects" element={<Outlet />}>
          <Route
            index
            element={<AdminForm firstTab="subjects" secondTab="subjectList" />}
          />
          <Route
            path="create"
            element={<AdminForm firstTab="subjects" secondTab="create" />}
          />
          <Route path="update/:id" element={<UpdateSubject />} />
          <Route path=":id" element={<ReadSpecificSubject />} />
        </Route>
        {/* --------------- Group------------------------------------ */}
        <Route path="groups" element={<Outlet />}>
          <Route
            index
            element={<AdminForm firstTab="groups" secondTab="groupList" />}
          />
          <Route
            path="create"
            element={<AdminForm firstTab="groups" secondTab="create" />}
          />
          <Route path="update/:id" element={<UpdateGroup />} />
          <Route path=":id" element={<ReadSpecificGroup />} />
        </Route>
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="attendance" element={<UseAttendanceTable />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="courses" element={<AdminCourse />} />
        <Route path="report" element={<AdminReport />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};
export default AdminRoute;
