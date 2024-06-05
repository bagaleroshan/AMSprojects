import { Outlet, Route, Routes } from "react-router-dom";
import AAttendance from "../MyComponents/Admin/AAttendance";
import AForms from "../MyComponents/Admin/AForms";
import AMessages from "../MyComponents/Admin/AMessages";
import AReport from "../MyComponents/Admin/AReport";
import AdminDashboard from "../MyComponents/Admin/AdminDashboard";
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
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AReport />} />
        <Route path="forms" element={<AForms />}>
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
