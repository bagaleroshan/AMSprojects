import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminAttendance from "../MyComponents/Admin/AdminAttendance";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
import AdminMessages from "../MyComponents/Admin/AdminMessages";
import AdminReport from "../MyComponents/Admin/AdminReport";
import CreateStudent from "../Student/CreateStudent";
import ReadSpecificStudent from "../Student/ReadSpecificStudent";
import UpdateStudent from "../Student/UpdateStudent";
import StudentTable from "../TableComponent/StudentTable";
import UpdateTeacher from "../TableComponent/UpdateTeacher";
import UserTable from "../TableComponent/UserTable";
import CreateUser from "../user/CreateUser";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import ShowAllSubjects from "../subject/ShowAllSubjects";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import CreateSubject from "../subject/CreateSubject";
import UpdateSubject from "../subject/UpdateSubject";

const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="report" element={<AdminReport />} />
        <Route path="forms" element={<Outlet />}>
          {/* ------------------- Users -------------------------------- */}
          <Route index element={<div>Forms</div>} />
          <Route path="users" element={<Outlet />}>
            <Route index element={<UserTable />} />
            {/* <Route path=":id" element={<MyProfile />} /> */}
            <Route path="create" element={<CreateUser />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateTeacher />} />
            </Route>
          </Route>

          {/* ---------------- Students------------------------------ */}
          <Route path="students" element={<Outlet />}>
            <Route index element={<StudentTable />} />
            <Route path=":id" element={<ReadSpecificStudent />} />
            <Route path="create" element={<CreateStudent />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateStudent />} />
            </Route>
          </Route>

          {/* --------------- Subjects------------------------------------ */}
          <Route path="subjects" element={<Outlet />}>
            <Route index element={<ShowAllSubjects />} />
            <Route path=":id" element={<ReadSpecificSubject />} />
            <Route path="create" element={<CreateSubject />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateSubject />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
