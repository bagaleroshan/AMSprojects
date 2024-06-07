import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminAttendance from "../mycomponents/admin/AdminAttendance";
import AdminDashboard from "../mycomponents/admin/AdminDashboard";
import AdminMessages from "../mycomponents/admin/AdminMessages";
import AdminReport from "../mycomponents/admin/AdminReport";
import CreateStudent from "../Student/CreateStudent";
import ReadSpecificStudent from "../Student/ReadSpecificStudent";
import UpdateStudent from "../Student/UpdateStudent";
import StudentTable from "../TableComponent/StudentTable";
import UpdateTeacher from "../TableComponent/UpdateTeacher";
import UserTable from "../TableComponent/UserTable";
import CreateUser from "../user/CreateUser";
import MyProfile from "../user/MyProfile";
import UpdatePassword from "../user/UpdatePassword";
import UpdateProfile from "../user/UpdateProfile";
import ShowAllSubjects from "../subject/ShowAllSubjects";
import ReadSpecificSubject from "../subject/ReadSpecificSubject";
import CreateSubject from "../subject/CreateSubject";
import UpdateSubject from "../subject/UpdateSubject";
import AdminForm from "../mycomponents/admin/adminForm/AdminForm";

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
        <Route path="messages" element={<AdminMessages />} />
        <Route path="report" element={<AdminReport />} />
        <Route path="forms" element={<Outlet />}>
        
          {/* ------------------- Users -------------------------------- */}

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

          {/* <Route index element={<div>Forms</div>} />
          <Route path="users" element={<Outlet />}>
            <Route index element={<UserTable />} />
            <Route path=":id" element={<MyProfile />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateTeacher />} />
            </Route>
          </Route> */}

          {/* ---------------- Students------------------------------ */}

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
          {/* <Route path="students" element={<Outlet />}>
            <Route index element={<StudentTable />} />
            <Route path=":id" element={<ReadSpecificStudent />} />
            <Route path="create" element={<CreateStudent />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateStudent />} />
            </Route>
          </Route> */}

          {/* --------------- Subjects------------------------------------ */}
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
          {/* <Route path="subjects" element={<Outlet />}>
            <Route index element={<ShowAllSubjects />} />
            <Route path=":id" element={<ReadSpecificSubject />} />
            <Route path="create" element={<CreateSubject />} />
            <Route path="update" element={<Outlet />}>
              <Route path=":id" element={<UpdateSubject />} />
            </Route>
          </Route> */}
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
