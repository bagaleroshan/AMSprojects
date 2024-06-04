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
import StudentForm from "./component/Student/StudentForm";

const App = () => {
  const token = useSelector((store: RootState) => store.user.token);
  const adminToken = useSelector((store: RootState) => store.user.adminToken);
  const teachersToken = useSelector(
    (store: RootState) => store.user.teachersToken
  );

  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <div>
            <MyNavBar
              token={token}
              adminToken={adminToken}
              teachersToken={teachersToken}
            ></MyNavBar>
            <Outlet />
          </div>
        }
      >
        <Route path="register" element={<CreateUser />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<div>404</div>} />
        {adminToken ? (
          <Route path="admin/*" element={<AdminRoute />} />
        ) : (
          <Route path="teachers/*" element={<TeacherRoute />} />
        )}
        <Route path="logout" element={<UserLogout />} />
      </Route> */}
      <Route path="/" element={<Outlet></Outlet>}>
        <Route path="create-student" element={<StudentForm></StudentForm>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
