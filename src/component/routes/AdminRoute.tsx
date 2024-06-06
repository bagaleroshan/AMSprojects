import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AMessages from "../MyComponents/Admin/AMessages";
import AReport from "../MyComponents/Admin/AReport";
import AAttendance from "../MyComponents/Admin/AdminAttendance";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
import AdminForm from "../MyComponents/Admin/adminForm/AdminForm";
import UpdateTeacher from "../MyComponents/Teacher/UpdateTeacher";
import CreateStudent from "../Student/CreateStudent";
import ReadSpecificStudent from "../Student/ReadSpecificStudent";
import UpdateStudent from "../Student/UpdateStudent";
import StudentTable from "../TableComponent/StudentTable";
import CreateSubject from "../subject/CreateSubject";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import ShowAllSubjects from "../subject/ShowAllSubjects";
import UpdateSubject from "../subject/UpdateSubject";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import UserTable from "../TableComponent/UserTable";
// import ViewRow from "../TableComponent/ViewRowProps";

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
        <Route path="attendance" element={<AAttendance />} />
        <Route path="forms" element={<AdminForm />} />
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AReport />} />

        <Route path="forms" element={<Outlet />}>
          <Route index element={<AdminForm />} />
          {/*------------------ Subject --------------------------*/}
          <Route path="subjects" element={<Outlet />}>
            <Route index element={<ShowAllSubjects />} />
            <Route path=":id" element={<ReadSpecificSubject />} />
            <Route path="create" element={<CreateSubject />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateSubject />} />
            </Route>
            {/* <Route path="subjects/View" element={<ViewRow />} /> */}
          </Route>
          {/* ----------------- User-------------------------------- */}
          <Route path="users" element={<Outlet />}>
            <Route index element={<UserTable />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateTeacher />} />
            </Route>
          </Route>

          {/* ---------------- Student------------------------------ */}
          <Route path="students" element={<Outlet />}>
            <Route index element={<StudentTable />} />
            <Route path=":id" element={<ReadSpecificStudent />} />
            <Route path="create" element={<CreateStudent />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateStudent />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
