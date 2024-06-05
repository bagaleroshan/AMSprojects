import { Outlet, Route, Routes } from "react-router-dom";
import CreateSubject from "../subject/CreateSubject";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import UpdateSubject from "../subject/UpdateSubject";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
import AdminForm from "../MyComponents/Admin/adminForm/AdminForm";
import AMessages from "../MyComponents/Admin/AMessages";
import AReport from "../MyComponents/Admin/AReport";
import AAttendance from "../MyComponents/Admin/AdminAttendance";

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
        <Route path="forms" element={<AdminForm />}>
          {/*------------------ Subject --------------------------*/}
          <Route path="subjects" element={<Outlet />}>
            <Route path=":id" element={<ReadSpecificSubject />} />
            <Route path="create" element={<CreateSubject />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateSubject />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
