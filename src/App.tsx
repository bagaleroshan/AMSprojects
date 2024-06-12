import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import WelcomePage from "./component/WelcomePage";
import AdminRoute from "./component/routes/AdminRoute";
import TeacherRoute from "./component/routes/TeacherRoute";
import AmsLayout from "./component/theme/AmsLayout";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import UserLogin from "./component/user/UserLogin";
import UserLogout from "./component/user/UserLogout";
import { RootState } from "./store/store";

const App = () => {
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  const teacherToken = useSelector(
    (store: RootState) => store.user.teachersToken
  );

  return (
    <Routes>
      {adminToken ? (
        <Route
          path="admin/*"
          element={
            <AmsLayout>
              <AdminRoute />
              {/* <DikshyaAdminRoute /> */}
              {/* <GroupForm /> */}
            </AmsLayout>
          }
        />
      ) : teacherToken ? (
        <Route
          path="teachers/*"
          element={
            <AmsLayout>
              <TeacherRoute />
            </AmsLayout>
          }
        />
      ) : (
        <Route path="/" element={<Outlet />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      )}
      <Route path="logout" element={<UserLogout />} />

      {/* Catch-all route */}
      <Route
        path="*"
        element={
          adminToken ? (
            <Navigate to="/admin" replace />
          ) : teacherToken ? (
            <Navigate to="/teachers" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
