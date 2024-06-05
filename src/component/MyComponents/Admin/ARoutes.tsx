import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AAttendance from "./AdminAttendance";
import AForms from "./adminForm";
import AMessages from "./AMessages";
import AReport from "./AReport";
import AChangePassword from "./AChangePassword";
import ALogout from "./ALogout";
import AdminDashboard from "./AdminDashboard";
import AdminLogout from "./AdminLogout";
import AdminLayout from "./AdminLayout";

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
                <AdminLayout></AdminLayout>
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
                  <AdminDashboard></AdminDashboard>
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
                  <AdminLogout></AdminLogout>
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
