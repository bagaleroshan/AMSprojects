import { useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminRoute from "./component/routes/AdminRoute";
import TeacherRoute from "./component/routes/TeacherRoute";
import AmsLayout from "./component/theme/AmsLayout";
import CreateUser from "./component/user/CreateUser";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import UserLogin from "./component/user/UserLogin";
import UserLogout from "./component/user/UserLogout";
import { RootState } from "./store/store";
import WelcomePage from "./component/WelcomePage";
import SubjectTable from "./component/TableComponent/SubjectTable";
import ViewRow from "./component/TableComponent/ViewRowProps";
import UpdateSubject from "./component/TableComponent/UpdateSubject";

const App = () => {
  const adminToken = useSelector((store: RootState) => store.user.adminToken);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Outlet />
          </div>
        }
      >
        <Route index element={<WelcomePage />} />
        <Route path="register" element={<CreateUser />} />
        <Route path="login" element={<UserLogin/>} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="subjects" element={<SubjectTable/>} />
        <Route path="subjects/View" element={<ViewRow />} />
        <Route path="subjects/update" element={<UpdateSubject/>} />
        

        {adminToken ? (
          <Route
            path="admin/*"
            element={
              <AmsLayout>
                <AdminRoute />
              </AmsLayout>
            }
          />
        ) : (
          <Route
            path="teachers/*"
            element={
              <AmsLayout>
                <TeacherRoute />
              </AmsLayout>
            }
          />
        )}
        <Route path="logout" element={<UserLogout />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
