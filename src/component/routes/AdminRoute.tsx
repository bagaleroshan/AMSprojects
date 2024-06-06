import { Outlet, Route, Routes } from "react-router-dom";
import AMessages from "../mycomponents/admin/AdminMessages";
import AReport from "../mycomponents/admin/AdminReport";
import AAttendance from "../mycomponents/admin/AdminAttendance";
import AdminDashboard from "../mycomponents/admin/AdminDashboard";
import AdminForm from "../mycomponents/admin/adminForm/AdminForm";
import CreateSubject from "../subject/CreateSubject";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import UpdateSubject from "../subject/UpdateSubject";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";

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
          {/* <Route path="update" element={<Outlet />}>
            <Route path=":id" element={<UpdateSubject />} />
          </Route> */}
        </Route>
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

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
