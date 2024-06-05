import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ADashboard from "./ADashboard";
import AAttendance from "./AAttendance";
import AForms from "./AForms/AForms";
import AMessages from "./AMessages";
import AReport from "./AReport";
import AChangePassword from "./AChangePassword";
import ALogout from "./ALogout";

const ARoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route
            index
            element={
              <div>
                <ADashboard></ADashboard>
              </div>
            }
          ></Route>
          <Route
            path="Dashboard"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route
              index
              element={
                <div>
                  <ADashboard></ADashboard>
                </div>
              }
            ></Route>
            <Route
              path="Attendance"
              element={
                <div>
                  <AAttendance></AAttendance>
                </div>
              }
            ></Route>
            <Route
              path="Forms"
              element={
                <div>
                  <AForms></AForms>
                </div>
              }
            ></Route>
            <Route
              path="Message"
              element={
                <div>
                  <AMessages></AMessages>
                </div>
              }
            ></Route>
            <Route
              path="Report"
              element={
                <div>
                  <AReport></AReport>
                </div>
              }
            ></Route>
            <Route
              path="ChangePassword"
              element={
                <div>
                  <AChangePassword></AChangePassword>
                </div>
              }
            ></Route>
            <Route
              path="Logout"
              element={
                <div>
                  <ALogout></ALogout>
                </div>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default ARoutes;
