import { Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./component/MyNavbar";
import CreateSubject from "./component/subject/CreateSubject";
import ReadSpecificSubject from "./component/subject/ReadSpecificSubject";
import UpdateSubject from "./component/subject/UpdateSubject";
import CreateUser from "./component/user/CreateUser";
import UpdatePassword from "./component/user/UpdatePassword";
import UserLogin from "./component/user/UserLogin";
// import ShowAllSubjects from "./component/CRUD-subject/ShowAllSubjects";

const App = () => {
  return (
    <>
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
          </Route>

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
