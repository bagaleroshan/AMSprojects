import { useParams } from "react-router-dom";
import { useReadAllAttendanceQuery } from "../../services/api/AttendanceService";
import AttendanceTable from "./AttendanceTable";

const StudentAttendanceTable = () => {
  const { id } = useParams();

  /************ Api For Attendance Record ********************* */
  const { data: dataattendanceRecord, error } = useReadAllAttendanceQuery(id);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const attendanceRecord = dataattendanceRecord?.result?.results;
  // console.log("Attendance Record***", attendanceRecord);

  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceTable attendanceRecord={attendanceRecord} />
    </div>
  );
};

export default StudentAttendanceTable;
