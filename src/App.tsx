import CreateSubject from "./component/subject/CreateSubject";
import ReadSpecificSubject from "./component/subject/ReadSpecificSubject";
// import CreateUser from "./component/user/CreateUser";
// import UpdatePassword from "./component/user/UpdatePassword";
// import UserLogin from "./component/user/UserLogin";
import { Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./component/MyNavbar";
import CreateStudent from "./component/Student/CreateStudent";
import ReadSpecificStudent from "./component/Student/ReadSpecificStudent";
import UpdateStudent from "./component/Student/UpdateStudent";
import UpdateSubject from "./component/subject/UpdateSubject";

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
              <Route
                path=":id"
                element={<UpdateSubject></UpdateSubject>}
              ></Route>
            </Route>
          </Route>

         

          <Route path="students" element={<Outlet></Outlet>}>
            <Route
              path="create-student"
              element={<CreateStudent></CreateStudent>}
            ></Route>
            <Route
              path=":id"
              element={<ReadSpecificStudent></ReadSpecificStudent>}
            ></Route>
            <Route path="update-student" element={<Outlet></Outlet>}>
              <Route
                path=":id"
                element={<UpdateStudent></UpdateStudent>}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
