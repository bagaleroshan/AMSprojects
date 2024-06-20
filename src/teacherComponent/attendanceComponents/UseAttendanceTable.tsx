import React from "react";
import { useParams } from "react-router-dom";
import { AttendanceTable } from "./AttendanceTableComponent";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";

export const UseAttendanceTable = () => {
  const params = useParams();
  const {
    isError: isErrorViewSpecific,
    isLoading,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(params.id);

  const students = dataViewSpecific?.result?.students.map((val) => {
    return { id: val.id, name: val.fullName };
  }) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isErrorViewSpecific) {
    return <div>Error: {errorViewSpecific.message}</div>;
  }

  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceTable students={students} />
    </div>
  );
};
