import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AAttendance from "../mycomponents/admin/AdminAttendance";
import AdminDashboard from "../mycomponents/admin/AdminDashboard";
import AMessages from "../mycomponents/admin/AdminMessages";
import AReport from "../mycomponents/admin/AdminReport";
import AdminForm from "../mycomponents/admin/adminForm/AdminForm";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
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
        {/* <Route path="forms" element={<AdminForm />} > */}
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AReport />} />
        {/*------------------ Subject --------------------------*/}
        <Route path="subjects" element={<Outlet />}>
          <Route
            path="create"
            element={<AdminForm firstTab="Subjects" secondTab="create" />}
          />
          <Route
            path="list"
            element={<AdminForm firstTab="Subjects" secondTab="subjectList" />}
          />
        </Route>
                {/* *---------Forms user--------* */}

        <Route path="users" element={<Outlet />}>
          <Route
            path="create"
            element={<AdminForm firstTab="Users" secondTab="create" />}
          />
          <Route
            path="list"
            element={<AdminForm firstTab="Users" secondTab="userList" />}
          />
        </Route>

        {/* *---------Student---------* */}
        <Route path="students" element={<Outlet />}>
          <Route
            path="create"
            element={<AdminForm firstTab="Students" secondTab="create" />}
          />
          <Route
            path="list"
            element={<AdminForm firstTab="Students" secondTab="studentList" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
