import { Outlet, Route, Routes } from "react-router-dom";
import TDashboard from "./TeacherDashboard";
import TMessages from "./TeacherMessages";
import TReport from "./TeacherReport";
import TeacherChangePassword from "./TeacherChangePassword";
import TeacherLogout from "./TeacherLogout";

const TeacherRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {" "}
              <Outlet></Outlet>
            </div>
          }
        >
          <Route
            index
            element={
              <div>
                <TDashboard></TDashboard>
              </div>
            }
          ></Route>
          <Route
            path="Teacher"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route
              path="Dashboard"
              element={
                <div>
                  <TDashboard></TDashboard>
                </div>
              }
            ></Route>
            <Route
              path="Messages"
              element={
                <div>
                  <TMessages></TMessages>
                </div>
              }
            ></Route>
            <Route
              path="Report"
              element={
                <div>
                  <TReport></TReport>
                </div>
              }
            ></Route>
            <Route
              path="ChangePassword"
              element={
                <div>
                  <TeacherChangePassword></TeacherChangePassword>
                </div>
              }
            ></Route>
            <Route
              path="Logout"
              element={
                <div>
                  <TeacherLogout></TeacherLogout>
                </div>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default TeacherRoutes;
