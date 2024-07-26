import { Box, Typography, Button, TextField } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useReadGroupByIdQuery } from "../../../services/api/GroupService";
import {
  useReadAttendanceForGroupQuery,
  useTakeAttendanceMutation,
} from "../../../services/api/AttendanceService";
import AttendanceTableComponent from "../../../teacherComponent/attendanceComponents/AttendanceTableComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../../utils/utils";
import { showSuccessToast } from "../../../muiModals/toastConfig";
import "./adminAttendance.css";

const AdminAttendance = ({ id }) => {
  console.log(id);
  const {
    data: groupData,
    isLoading: isGroupDataLoading,
    error: groupError,
  } = useReadGroupByIdQuery(id || "");
  const [
    takeAttendance,
    {
      isSuccess: successTakingAttendance,
      isError: errorTakingAttendance,
      error: attendanceError,
      data: successAttendance,
    },
  ] = useTakeAttendanceMutation();
  const { data: attendanceDataForGroup, refetch } = useReadAttendanceForGroupQuery(
    id || ""
  );

  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredAttendance, setFilteredAttendance] = useState([]);

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
      refetch(); // Refetch attendance data after successful attendance logging
    }
  }, [successTakingAttendance, successAttendance, refetch]);

  useEffect(() => {
    if (groupData && groupData.result && groupData.result.students) {
      const initialStudents = groupData.result.students.map((student) => ({
        studentId: student.id,
        fullName: student.fullName,
        attendance: "P",
      }));
      setStudents(initialStudents);
    }
  }, [groupData]);

  useEffect(() => {
    const selectedDateString = new Date(selectedDate).toDateString();
    const selectedDateAttendance =
      attendanceDataForGroup?.result?.results?.filter(
        (att) => new Date(att.date).toDateString() === selectedDateString
      );

    if (selectedDateAttendance?.length) {
      const updatedStudents = students.map((student) => {
        const attendanceRecord = selectedDateAttendance.find(
          (att) => att.studentId._id === student.studentId
        );
        return {
          ...student,
          attendance: attendanceRecord ? attendanceRecord.status : "P",
        };
      });
      setFilteredAttendance(updatedStudents);
    } else {
      setFilteredAttendance(students);
    }
  }, [selectedDate, students, attendanceDataForGroup]);

  const toggleAttendance = (index) => {
    setFilteredAttendance((prevStudents) =>
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
    attendance: filteredAttendance.map((student) => ({
      studentId: student.studentId,
      status: student.attendance,
    })),
  };

  const logAttendance = () => {
    takeAttendance({ id, data: attendanceData });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "fullName",
        Cell: (row) => <span>{changeFirstName(row.value)}</span>,
      },
      {
        Header: "Attendance",
        accessor: "attendance",
        Cell: ({ row }) => (
          <Button
            onClick={() => toggleAttendance(row.index)}
            sx={{
              width: "100%",
              justifyContent: "left",
              textTransform: "none",
            }}
          >
            {filteredAttendance[row.index].attendance}
          </Button>
        ),
      },
    ],
    [filteredAttendance]
  );

  if (!id || id === "") return <Typography>Select A group</Typography>;
  if (isGroupDataLoading) return <Typography>Loading...</Typography>;
  if (groupError) return <Typography>Error Loading group Data</Typography>;

  return (
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
            popperPlacement="top-start"
            portalId="root-portal"
            className="custom-date-picker"
          />
        </Box>
        <div className="tableclass">
          <AttendanceTableComponent
            columns={columns}
            data={filteredAttendance}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={logAttendance}
            sx={{ mt: 2 }}
          >
            Log Attendance
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AdminAttendance;
