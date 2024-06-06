import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "../mycomponents/admin/AdminDashboard";
import AMessages from "../mycomponents/admin/AdminMessages";
import AdminForm from "../mycomponents/admin/adminForm/AdminForm";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import UpdateSubject from "../subject/UpdateSubject";
import UpdateStudent from "../Student/UpdateStudent";
import UpdateTeacher from "../mycomponents/teacher/UpdateTeacher";
import AdminReport from "../mycomponents/admin/AdminReport";
import AdminAttendance from "../mycomponents/admin/AdminAttendance";
// import ViewRow from "../TableComponent/ViewRowProps";

const AdminRoute = () => {
  return (
    <Routes>
      <
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
        {/* <Route path="forms" element={<AdminForm />} > */}
        <Route path="messages" element={<AMessages />} />
        <Route path="report" element={<AdminReport />} />
        {/*------------------ Subject --------------------------*/}
        {/* <Route path="forms" element={<AdminForm />} > */}
        <Route path="forms" element={<Outlet />}>
          <Route path="subjects" element={<Outlet />}>
            <Route
              path="create"
              element={<AdminForm firstTab="Subjects" secondTab="create" />}
            />
            <Route
              path="list"
              element={
                <AdminForm firstTab="Subjects" secondTab="subjectList" />
              }
            />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateSubject />} />
            </Route>
          </Route>
          {/* *---------Forms user--------* */}

          <Route path="users" element={<Outlet />}>
            <Route
              index
              element={<AdminForm firstTab="Users" secondTab="userList" />}
            />
            <Route
              path="create"
              element={<AdminForm firstTab="Users" secondTab="create" />}
            />

            <Route path="update" element={<Outlet></Outlet>}>
              <Route path=":id" element={<UpdateTeacher />} />
            </Route>
          </Route>

          {/* *---------Student---------* */}
          <Route path="students" element={<Outlet />}>
            <Route
              path="create"
              element={<AdminForm firstTab="Students" secondTab="create" />}
            />
            <Route path="update" element={<Outlet></Outlet>}>
              <Route path=":id" element={<UpdateStudent></UpdateStudent>} />
            </Route>
            <Route
              path="list"
              element={
                <AdminForm firstTab="Students" secondTab="studentList" />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
