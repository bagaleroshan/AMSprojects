import { Outlet, Route, Routes } from "react-router-dom";
import FeedbackForm from "../../feedback/FeedBackForm";
import StudentDashboard from "../../studentComponent/StudentDashboard";

const StudentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
};

export default StudentRoute;
