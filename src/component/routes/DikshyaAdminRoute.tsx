import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminDashboard from "../mycomponents/admin/AdminDashboard";
import AMessages from "../mycomponents/admin/AdminMessages";
import AdminForm from "../mycomponents/admin/adminForm/AdminForm";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import UpdateSubject from "../subject/UpdateSubject";
import UpdateStudent from "../Student/UpdateStudent";
import AdminReport from "../mycomponents/admin/AdminReport";
import AdminAttendance from "../mycomponents/admin/AdminAttendance";
import UpdateTeacher from "../TableComponent/UpdateTeacher";
// import ViewRow from "../TableComponent/ViewRowProps";

const DikshyaAdminRoute = () => {
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

        {/*------------------ FORM --------------------------*/}
        <Route path="forms" element={<Outlet />}>
          {/* ****************Subjects**************************** */}

          <Route path="subjects" element={<Outlet />}>
            <Route
              index
              element={
                <AdminForm
                  firstTab="subjects"
                  secondTab="subjectList"
                  header="Subject"
                />
              }
            />
            <Route
              path="create"
              element={
                <AdminForm
                  firstTab="subjects"
                  secondTab="/create"
                  header="Subject"
                />
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
              element={
                <AdminForm
                  firstTab="users"
                  secondTab="userList"
                  header="User"
                />
              }
            />
            <Route
              path="create"
              element={
                <AdminForm firstTab="users" secondTab="/create" header="User" />
              }
            />

            <Route path="update" element={<Outlet></Outlet>}>
              <Route path=":id" element={<UpdateTeacher />} />
            </Route>
          </Route>

          {/* *---------Student---------* */}
          <Route path="students" element={<Outlet />}>
            <Route
              index
              element={
                <AdminForm
                  firstTab="students"
                  secondTab="studentList"
                  header="Student"
                />
              }
            />
            <Route
              path="create"
              element={
                <AdminForm
                  firstTab="students"
                  secondTab="/create"
                  header="Student"
                />
              }
            />
            <Route path="update" element={<Outlet></Outlet>}>
              <Route path=":id" element={<UpdateStudent></UpdateStudent>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default DikshyaAdminRoute;
