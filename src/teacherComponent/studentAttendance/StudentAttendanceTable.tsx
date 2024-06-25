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
import AttendanceTable from "./AttendanceTable";

const StudentAttendanceTable = () => {
  const { id } = useParams();
  const {
    isError: isErrorReadGroupById,
    isLoading,
    data: GroupById,
    error: errorReadGroupById,
  } = useReadGroupByIdQuery(id);
  //   console.log("Read Group BY ID***", GroupById);
  const studentsInGroup = GroupById?.result?.students || [];

  useEffect(() => {
    isErrorReadGroupById &&
      (isFetchBaseQueryError(errorReadGroupById)
        ? toast.error(getErrorMessage(errorReadGroupById))
        : isSerializedError(errorReadGroupById)
        ? toast.error(errorReadGroupById?.message)
        : "Unknown Error");
  }, [isErrorReadGroupById, errorReadGroupById]);

  /************ Api For Attendance Record ********************* */
  const { data: dataAttendanceRecord, error } = useReadAllAttendanceQuery(id);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const AttendanceRecord = dataAttendanceRecord?.result?.results;
  //   console.log("Attendance Record***", AttendanceRecord);

  const studentAttendanceDetail =
    !AttendanceRecord || AttendanceRecord.length === 0
      ? studentsInGroup.map((studentsInGroup) => ({
          fullName: studentsInGroup.fullName,
          id: studentsInGroup.id,
        }))
      : studentsInGroup.flatMap((studentsInGroup) => {
          return AttendanceRecord.filter(
            (AttendanceRecord) =>
              studentsInGroup.id === AttendanceRecord.studentId
          ).map((AttendanceRecord) => ({
            fullName: studentsInGroup.fullName,
            id: studentsInGroup.id,
            status: AttendanceRecord.status,
            date: new Date(AttendanceRecord.date).toLocaleDateString(),
          }));
        });

  console.log("studentAttendanceDetail*********", studentAttendanceDetail);

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

export default StudentAttendanceTable;
