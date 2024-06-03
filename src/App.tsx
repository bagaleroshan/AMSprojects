import { useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./component/MyNavbar";
import AdminRoute from "./component/routes/AdminRoute";
import TeacherRoute from "./component/routes/TeacherRoute";

import CreateUser from "./component/user/CreateUser";
import ForgotPassword from "./component/user/ForgotPassword";
import UserLogin from "./component/user/UserLogin";
import UserLogout from "./component/user/UserLogout";
import { RootState } from "./store/store";

const App = () => {
  const token = useSelector((store: RootState) => store.user.token);
  const role = useSelector((store: RootState) => store.user.role);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <MyNavBar token={token} role={role}></MyNavBar>
            <Outlet />
          </div>
        }
      >
        <Route path="register" element={<CreateUser />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<div>404</div>} />
        {role === "admin" ? (
          <Route path="admin/*" element={<AdminRoute />} />
        ) : (
          <Route path="teachers/*" element={<TeacherRoute />} />
        )}
        <Route path="logout" element={<UserLogout />} />
      </Route>
    </Routes>
  );
};

export default App;
