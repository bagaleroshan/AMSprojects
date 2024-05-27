// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import RoughForm from "./component/Rough/RoughForm";
// import DwForm from "./component/dwForm/DwForm";
// import DateAndTimeDemo from "./component/Rough/DateAndTimeDemo";
// import BasicTable from "./component/BasicTable";
import { Outlet, Route, Routes } from "react-router-dom";
import CreateSubject from "./component/CRUD-subject/CreateSubject";
import UpdateSubject from "./component/CRUD-subject/UpdateSubject";
import MyNavBar from "./component/MyNavbar";
import Table from "./component/ReactTable/Table";
import CreateRegister from "./component/CRUD-USER/CreateRegister";

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
          <Route path="subjects" element={<Outlet></Outlet>}>
            {/* <Route index element={<ShowAllSubjects></ShowAllSubjects>}></Route> */}
            <Route index element={<Table></Table>}></Route>

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
        </Route>
      </Routes>
    </>
  );
};

export default App;
