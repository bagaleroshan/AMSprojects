import { Outlet, Route, Routes } from "react-router-dom";
import AMessages from "../mycomponents/admin/AMessages";
import AReport from "../mycomponents/admin/AReport";
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
        <Route path="forms" element={<AdminForm />} />
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AReport />} />
        {/*------------------ Subject --------------------------*/}
        <Route path="subjects" element={<Outlet />}>
          <Route path=":id" element={<ReadSpecificSubject />} />
          <Route path="create" element={<CreateSubject />} />
          <Route path="update" element={<Outlet />}>
            <Route path=":id" element={<UpdateSubject />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
