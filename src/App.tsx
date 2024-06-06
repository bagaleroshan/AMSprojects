import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import WelcomePage from "./component/WelcomePage";
import AdminRoute from "./component/routes/AdminRoute";
import TeacherRoute from "./component/routes/TeacherRoute";
import AmsLayout from "./component/theme/AmsLayout";
import CreateUser from "./component/user/CreateUser";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import UserLogin from "./component/user/UserLogin";
import UserLogout from "./component/user/UserLogout";
import { RootState } from "./store/store";

const App = () => {
  // const token = useSelector((store: RootState) => store.user.adminToken);
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  // const teachersToken = useSelector(
  //   (store: RootState) => store.user.teachersToken
  // );

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
        <Route path="login" element={<UserLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {
          adminToken ? (
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
          )
          // : (
          //   <Route path="*" element={<Navigate to="/login" replace />} />
          // )
        }
        <Route path="logout" element={<UserLogout />} />
      </Route>
    </Routes>
  );
};

export default App;
