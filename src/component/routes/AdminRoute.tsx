import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminAttendance from "../MyComponents/Admin/AdminAttendance";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
import AdminMessages from "../MyComponents/Admin/AdminMessages";
import AdminReport from "../MyComponents/Admin/AdminReport";
import AdminForm from "../MyComponents/Admin/adminForm/AdminForm";
import ReadSpecificStudent from "../Student/ReadSpecificStudent";
import UpdateStudent from "../Student/UpdateStudent";
import UpdateTeacher from "../teacher/UpdateTeacher";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import UpdateSubject from "../subject/UpdateSubject";
import MyProfile from "../user/MyProfile";
import ReadSpecificUser from "../user/ReadSpecificUser";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<AdminDashboard />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="report" element={<AdminReport />} />

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

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
