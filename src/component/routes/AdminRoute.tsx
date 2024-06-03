import { Outlet, Route, Routes } from "react-router-dom";
import UpdatePassword from "../user/UpdatePassword";
import ResetPassword from "../user/ResetPassword";
import MyProfile from "../user/MyProfile";
import UpdateProfile from "../user/UpdateProfile";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import CreateSubject from "../subject/CreateSubject";
import UpdateSubject from "../subject/UpdateSubject";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<div>Admin Dashboard</div>} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
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
