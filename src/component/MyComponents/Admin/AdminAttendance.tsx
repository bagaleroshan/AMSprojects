import { Box, Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useReadGroupByIdQuery } from "../../../services/api/GroupService";
import { useState, useEffect } from "react";
import AttendanceTableComponent from "../../../teacherComponent/attendanceComponents/AttendanceTableComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTakeAttendanceMutation } from "../../../services/api/AttendanceService";
import { toast } from "react-toastify";
import { getErrorMessage, isFetchBaseQueryError, isSerializedError } from "../../../utils/utils";
import { showSuccessToast } from "../../../muiModals/toastConfig";

const AdminAttendance = (id) => {
  const { data: groupData, isLoading: isGroupDataLoading, error: groupError } = useReadGroupByIdQuery(id.id || "");
  const [takeAttendance, { isSuccess: successTakingAttendance, isError: errorTakingAttendance, error: attendanceError, data: successAttendance }] = useTakeAttendanceMutation();

  // State to manage students and the selected date
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (errorTakingAttendance) {
      if (isFetchBaseQueryError(attendanceError)) {
        toast.error(getErrorMessage(attendanceError), { autoClose: 5000 });
      } else if (isSerializedError(attendanceError)) {
        toast.error(attendanceError?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [errorTakingAttendance, attendanceError]);

  useEffect(() => {
    if (successTakingAttendance) {
      showSuccessToast(successAttendance.message);
    }
  }, [successTakingAttendance, successAttendance]);

  useEffect(() => {
    if (groupData && groupData.result && groupData.result.students) {
      const initialStudents = groupData.result.students.map((student) => ({
        studentId: student.id,
        student: student.fullName,
        attendance: "P",
      }));
      setStudents(initialStudents);
    }
  }, [groupData]);

  // Toggle attendance status between "P" and "A"
  const toggleAttendance = (index) => {
    setStudents((prevStudents) =>
      prevStudents.map((student, i) =>
        i === index
          ? {
              ...student,
              attendance: student.attendance === "P" ? "A" : "P",
            }
          : student
      )
    );
  };

  const attendanceData = {
    date: selectedDate.toISOString(),
    attendance: students.map((student) => ({
      studentId: student.studentId,
      status: student.attendance,
    })),
  };

  // Log attendance data with the selected date
  const logAttendance = () => {
    console.log(attendanceData);
    takeAttendance({ id: id.id, data: attendanceData });
  };

  // Define columns for the attendance table
  const columns = [
    { Header: "Student Name", accessor: "student" },
    {
      Header: "Attendance",
      accessor: "attendance",
      Cell: ({ row }) => (
        <Button
          onClick={() => toggleAttendance(row.index)}
          sx={{ width: "100%", justifyContent: "left", textTransform: "none" }}
        >
          {students[row.index].attendance}
        </Button>
      ),
    },
  ];

  if (isGroupDataLoading) return <Typography>Loading...</Typography>;
  if (groupError) return <Typography>Select Group</Typography>;

  return (
    <>
      <div className="teacherDashboard">
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 3,
          }}
        >
          <Box
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: 600,
              position: "relative", 
            }}
          >
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date || new Date())} 
              dateFormat="yyyy/MM/dd"
              customInput={<TextField />}
              popperPlacement="bottom-start" 
              portalId="root-portal" 
            />
          </Box>
          <AttendanceTableComponent columns={columns} data={students} />
          <Button
            variant="contained"
            color="primary"
            onClick={logAttendance}
            sx={{ mt: 2 }}
          >
            Log Attendance
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AdminAttendance;
