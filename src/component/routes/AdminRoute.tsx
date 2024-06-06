import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import UpdateStudent from "../Student/UpdateStudent";

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
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AdminReport />} />
        <Route path="forms" element={<Outlet />}>
          {/* ---------------- Students------------------------------ */}
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
