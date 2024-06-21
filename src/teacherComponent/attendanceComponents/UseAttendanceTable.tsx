import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReadAllAttendanceQuery } from "../../services/api/AttendanceService";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { AttendanceTable } from "./AttendanceTableComponent";

export const UseAttendanceTable = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    isLoading,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(id);

  useEffect(() => {
    isErrorViewSpecific &&
      (isFetchBaseQueryError(errorViewSpecific)
        ? toast.error(getErrorMessage(errorViewSpecific))
        : isSerializedError(errorViewSpecific)
        ? toast.error(errorViewSpecific?.message)
        : "Unknown Error");
  }, [isErrorViewSpecific, errorViewSpecific]);

  /* Api For Attendance Record */
  const { data: dataAttendance } = useReadAllAttendanceQuery(id);
  const attendanceData = dataAttendance?.result?.results || [];

  const studentsDetail = dataViewSpecific?.result?.students || [];

  // console.log("Specific Group", studentsDetail);
  // console.log("attendance data", attendanceData);

  const studentAttendanceDetail = studentsDetail.flatMap((studentInfo) => {
    return attendanceData
      .filter((attendanceInfo) => studentInfo.id === attendanceInfo.studentId)
      .map((attendanceInfo) => ({
        fullName: studentInfo.fullName,
        id: attendanceInfo.studentId,
        status: attendanceInfo.present,
        date: attendanceInfo.date,
      }));
  });
  // console.log("studentAttendanceDetail finallllllll", studentAttendanceDetail);

  const students =
    dataViewSpecific?.result?.students.map((val) => {
      return { id: val.id, name: val.fullName };
    }) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceTable students={studentAttendanceDetail} />
    </div>
  );
};
