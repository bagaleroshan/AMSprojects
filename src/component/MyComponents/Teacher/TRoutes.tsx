import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import TeacherDashboard from "../TeacherDashboard";
import TMessages from "./TMessages";
import TReport from "./TReport";
import TChangePassword from "./TChangePassword";
import TLogout from "./TLogout";
import TDashboard from "./TDashboard";

const TRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div> <Outlet></Outlet></div>}>
          <Route index element={<div><TDashboard></TDashboard></div>}></Route>
          <Route path="Teacher" element={<div><Outlet></Outlet></div>}>
            <Route path="Dashboard" element={<div><TDashboard></TDashboard></div>}></Route>
          <Route path="Messages" element={<div><TMessages></TMessages></div>}></Route>
          <Route path="Report" element={<div><TReport></TReport></div>}></Route>
          <Route path="ChangePassword" element={<div><TChangePassword></TChangePassword></div>}></Route>
          <Route path="Logout"
            element={
              <div>
                <TLogout></TLogout>
              </div>
            }
          ></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default TRoutes;
