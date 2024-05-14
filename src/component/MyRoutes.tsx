import { Outlet, Route, Routes } from "react-router-dom";
import MyNavBar from "./MyNavbar";
import CreateSubject from "./CRUD-subject/CreateSubject";

const MyRoutes = () => {
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
          <Route path="subjects" element={<Outlet></Outlet>}>
            <Route
              path="create"
              element={<CreateSubject></CreateSubject>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MyRoutes;
