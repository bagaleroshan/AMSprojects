import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./component/MyNavbar";
import CreateSubject from "./component/subject/CreateSubject";
import ReadSpecificSubject from "./component/subject/ReadSpecificSubject";
import UpdateSubject from "./component/subject/UpdateSubject";
import CreateUser from "./component/user/CreateUser";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";
import UserLogin from "./component/user/UserLogin";
import UserLogout from "./component/user/UserLogout";
import { RootState } from "./store/store";
import MyProfile from "./component/user/MyProfile";
import MyProfileUpdate from "./component/user/UpdateProfile";
// import ShowAllSubjects from "./component/CRUD-subject/ShowAllSubjects";

const App = () => {
  const token = useSelector((store: RootState) => {
    // console.log(store.user.token);
    return store.user.token;
  });
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <MyNavBar token={token}></MyNavBar>
              <Outlet></Outlet>
            </div>
          }
        >
          {/* ************************************** User ******************************************** */}
          {token ? (
            <>
              <Route path="users" element={<Outlet />}>
                <Route path="dashboard" element={<div>Dashboard</div>} />
                <Route path="update-password" element={<UpdatePassword />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="update-profile" element={<MyProfileUpdate />} />
                <Route path="logout" element={<UserLogout />} />
              </Route>
              <Route path="*" element={<Navigate to="/users/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="register" element={<CreateUser />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="update-password" element={<UpdatePassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="*" element={<div>404</div>} />
            </>
          )}

          {/* ********************************************* Subjects *********************************** */}
          <Route path="subjects" element={<Outlet></Outlet>}>
            {/* <Route index element={<ShowAllSubjects></ShowAllSubjects>}></Route> */}
            <Route
              path=":id"
              element={<ReadSpecificSubject></ReadSpecificSubject>}
            ></Route>
            <Route
              path="create"
              element={<CreateSubject></CreateSubject>}
            ></Route>
            <Route path="update" element={<Outlet></Outlet>}>
              <Route
                path=":id"
                element={<UpdateSubject></UpdateSubject>}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
