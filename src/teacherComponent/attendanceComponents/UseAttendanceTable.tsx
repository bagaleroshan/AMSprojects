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
import AttendanceTable from "./AttendanceTableComponent";

export const UseAttendanceTable = () => {
  const { id } = useParams();
  const {
    isError: isErrorViewSpecific,
    isLoading,
    data: dataViewSpecific,
    error: errorViewSpecific,
  } = useReadGroupByIdQuery(id);

  // console.log("Read Group BY ID***", dataViewSpecific);
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

  // console.log("Students Group", studentsDetail);
  // console.log("attendance data", attendanceData);

  const studentAttendanceDetail =
    attendanceData.length === 0
      ? studentsDetail.map((studentsDetail) => ({
          fullName: studentsDetail.fullName,
          id: studentsDetail.id,
        }))
      : studentsDetail.flatMap((studentsDetail) => {
          return attendanceData
            .filter(
              (attendanceData) => studentsDetail.id === attendanceData.studentId
            )
            .map((attendanceData) => ({
              fullName: studentsDetail.fullName,
              id: studentsDetail.id,
              status: attendanceData.status,
              date: new Date(attendanceData.date).toLocaleDateString(),
            }));
        });

  // console.log(studentAttendanceDetail);

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
