import React from "react";
import { useParams } from "react-router-dom";
import UseTeacherReportTable from "../../component/MyComponents/Teacher/UseTeacherReportTable";

const AttendanceDetail = () => {
  const params = useParams()
  const id = params.id
  return <div>
          <UseTeacherReportTable groupId={id} />
  </div>;
};

export default AttendanceDetail;
