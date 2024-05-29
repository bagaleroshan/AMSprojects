import CreateSubject from "./component/subject/CreateSubject";
import ReadSpecificSubject from "./component/subject/ReadSpecificSubject";
// import CreateUser from "./component/user/CreateUser";
// import UpdatePassword from "./component/user/UpdatePassword";
// import UserLogin from "./component/user/UserLogin";
import { Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./component/MyNavbar";
import CreateUser from "./component/User/CreateUser";
import UserLogin from "./component/User/UserLogin";
import UpdatePassword from "./component/User/UpdatePassword";
import CreateRegister from "./component/CRUD-USER/CreateRegister";
import ResetPassword from "./component/User/ResetPassword";
import CreateStudent from "./component/Student/CreateStudent";

const App = () => {
  return (
    <>
      {/* <DwForm></DwForm> */}
      {/* <DateAndTime></DateAndTime> */}
      {/* <RoughForm></RoughForm> */}
      {/* <DateAndTimeDemo></DateAndTimeDemo> */}
      {/* <Table></Table> */}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <MyNavBar></MyNavBar>
              <Outlet></Outlet>
            </div>
          }
        >
          {/* ************************************** User ******************************************** */}
          <Route path="users" element={<Outlet></Outlet>}>
            <Route index element={<CreateUser></CreateUser>}></Route>
            <Route path="login" element={<UserLogin></UserLogin>}></Route>
            <Route
              path="update-password"
              element={<UpdatePassword></UpdatePassword>}
            ></Route>
            <Route path="profile" element={<div>Dashboard</div>}></Route>
            <Route
              path="reset-password"
              element={<ResetPassword></ResetPassword>}
            ></Route>
          </Route>

          {/* ********************************************* Subjects *********************************** */}
          <Route path="subjects" element={<Outlet></Outlet>}>
            {/* <Route index element={<ShowAllSubjects></ShowAllSubjects>}></Route> */}
            {/* <Route index element={<Table></Table>}></Route> */}

            <Route
              path=":id"
              element={<ReadSpecificSubject></ReadSpecificSubject>}
            ></Route>
            <Route
              path="create"
              element={<CreateSubject></CreateSubject>}
            ></Route>

            <Route path="update" element={<Outlet></Outlet>}>
              {/* <Route
                path=":id"
                element={<UpdateSubject></UpdateSubject>}
              ></Route> */}
            </Route>
          </Route>
          <Route
            path="user"
            element={<CreateRegister></CreateRegister>}
          ></Route>

          <Route
            path="students"
            element={<CreateStudent></CreateStudent>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
