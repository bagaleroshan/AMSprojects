import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useReadAllAttendanceQuery,
  useReadAttendanceForGroupQuery,
  useTakeAttendanceMutation,
} from "../../services/api/AttendanceService";
import AttendanceTableComponent from "./AttendanceTableComponent";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import { toast } from "react-toastify";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

const UseAttendanceTable = () => {
  const { id } = useParams();
  const {
    data: groupData,
    isLoading: groupDataIsLoading,
    isError: groupDataIsError,
    error: groupError,
  } = useReadGroupByIdQuery(id);
  const {
    data: attendanceData,
    refetch: refetchAttendanceData,
    isLoading: attendanceDataIsLoading,
    isError: attendanceDataIsError,
  } = useReadAllAttendanceQuery(id);
  const {
    data: attendanceDataForThisGroup,
    refetch: refetchAttendanceDataForGroup,
    isLoading: attendanceForGroupIsLoading,
    isError: attendanceForGroupIsError,
  } = useReadAttendanceForGroupQuery(id);
  const [
    takeAttendance,
    {
      isSuccess: isSuccessAttendance,
      isError: isErrorAttendance,
      error: takeAttendanceError,
      data: isSuccessTakeAttendance,
    },
  ] = useTakeAttendanceMutation();
  const groupDataStudents = groupData?.result?.students || [];
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [todaysAttendanceExists, setTodaysAttendanceExists] = useState(false);

  useEffect(() => {
    if (isErrorAttendance) {
      if (isFetchBaseQueryError(takeAttendanceError)) {
        toast.error(getErrorMessage(takeAttendanceError), { autoClose: 5000 });
      } else if (isSerializedError(takeAttendanceError)) {
        toast.error(takeAttendanceError?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorAttendance, takeAttendanceError]);

  useEffect(() => {
    if (isSuccessAttendance) {
      toast.success(isSuccessTakeAttendance.message, {
        autoClose: 3000,
      });
      // Refetch attendance data
      refetchAttendanceData();
      refetchAttendanceDataForGroup();
    }
  }, [
    isSuccessAttendance,
    isSuccessTakeAttendance,
    refetchAttendanceData,
    refetchAttendanceDataForGroup,
  ]);

  useEffect(() => {
    if (attendanceData?.result) {
      const initialAttendanceStatus = groupDataStudents.reduce(
        (acc, student) => {
          acc[student._id] = "P"; // Default to 'P' for Present
          return acc;
        },
        {}
      );
      attendanceData.result.forEach((student) => {
        student.attendance.forEach((record) => {
          if (
            new Date(record.date).toDateString() === new Date().toDateString()
          ) {
            initialAttendanceStatus[student._id || student.studentId] =
              record.status;
          }
        });
      });
      setAttendanceStatus(initialAttendanceStatus);
    }
  }, [attendanceData, groupDataStudents]);

  useEffect(() => {
    if (attendanceDataForThisGroup?.result?.results.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const todayAttendance = attendanceDataForThisGroup.result.results.some(
        (record) => record.date.split("T")[0] === today
      );
      setTodaysAttendanceExists(todayAttendance);
    }
  }, [attendanceDataForThisGroup]);

  if (
    attendanceDataIsLoading ||
    groupDataIsLoading ||
    attendanceForGroupIsLoading
  ) {
    return <div>Loading...</div>;
  }

  if (attendanceDataIsError || groupDataIsError || attendanceForGroupIsError) {
    return <div>Error loading data.</div>;
  }

  const today = new Date();
  const lastThreeDays = Array.from({ length: 3 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index - 1);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  const attendanceByStudent = groupDataStudents.reduce((acc, student) => {
    const { fullName, _id } = student;
    acc[_id] = { studentId: _id, studentName: fullName, attendance: {} };
    return acc;
  }, {});

  if (attendanceData?.result) {
    attendanceData.result.forEach((student) => {
      const { _id, studentId, attendance } = student;
      const idToUse = _id || studentId; // Use _id if available, otherwise use studentId
      if (attendanceByStudent[idToUse]) {
        attendance.forEach((record) => {
          const formattedDate = new Date(record.date).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );
          attendanceByStudent[idToUse].attendance[formattedDate] =
            record.status;
        });
      }
    });
  }

  const todayFormatted = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const columns = [
    { Header: "Student Name", accessor: "studentName" },
    ...lastThreeDays.map((date) => ({
      Header: date,
      accessor: date,
      Cell: ({ value }) => value || "-",
    })),
    {
      Header: todaysAttendanceExists ? todayFormatted : "Take Attendance",
      accessor: "takeAttendance",
      Cell: ({ row }) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleAttendance(row.original.studentId)}
        >
          {todaysAttendanceExists
            ? attendanceByStudent[row.original.studentId]?.attendance[
                todayFormatted
              ] || "-"
            : attendanceStatus[row.original.studentId] || "P"}
        </div>
      ),
    },
  ];

  const toggleAttendance = (studentId) => {
    if (!todaysAttendanceExists) {
      setAttendanceStatus((prev) => ({
        ...prev,
        [studentId]: prev[studentId] === "A" ? "P" : "A",
      }));
    }
  };

  const filteredTableData = Object.entries(attendanceByStudent).map(
    ([studentId, data]) => ({
      studentId,
      studentName: data.studentName,
      ...lastThreeDays.reduce((acc, date) => {
        acc[date] = data.attendance[date] || "-";
        return acc;
      }, {}),
    })
  );

  const currentDate = new Date().toISOString();
  const logAttendance = () => {
    const attendanceDataToLog = Object.entries(attendanceStatus).map(
      ([studentId, status]) => ({
        studentId,
        status,
      })
    );

    const data = { date: currentDate, attendance: attendanceDataToLog };
    takeAttendance({ id, data });
  };

  return (
    <div>
      <h1>Attendance Table</h1>
      <AttendanceTableComponent columns={columns} data={filteredTableData} />
      {!todaysAttendanceExists && (
        <button onClick={logAttendance}>Log Attendance</button>
      )}
    </div>
  );
};

export default UseAttendanceTable;
