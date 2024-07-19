import React, { useMemo, useEffect } from "react";
import { useReadAllAttendanceQuery } from "../services/api/AttendanceService";
import AttendanceTableComponent from "../teacherComponent/attendanceComponents/AttendanceTableComponent";
import { CircularProgress, Box, Typography, Stack } from "@mui/material";
import AdminReportExcel from "../component/ExportCSV/AdminRepordExcel";

const AdminGroupReport = ({ groupId }) => {
  const { data, isLoading, error, refetch } =
    useReadAllAttendanceQuery(groupId);

  useEffect(() => {
    // Trigger refetch when groupId changes or on initial load
    refetch();
  }, [groupId, refetch]);

  const attendanceData = data?.result?.data || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const columns = useMemo(() => {
    if (attendanceData.length === 0 || !attendanceData[0].attendance) return [];

    const dateColumns = attendanceData[0].attendance.map((att, index) => ({
      Header: formatDate(att.date), // Format date here
      accessor: `attendance[${index}].status`,
      // Cell rendering with conditional styling
      Cell: ({ value }) => (
        <div>{value}</div>
      ),
    }));

    return [
      { Header: "Student Name", accessor: "studentName" },
      ...dateColumns,
    ];
  }, [attendanceData]);

  const formattedData = useMemo(() => {
    return attendanceData.map((student) => ({
      _id: student._id,
      studentName: student.studentName,
      attendance: student.attendance || [],
    }));
  }, [attendanceData]);

  // Function to determine cell color based on attendance status
  const getColorForAttendance = (status) => {
    switch (status) {
      case "P":
        return "green"; // Green for Present
      case "A":
        return "red"; // Red for Absent
      default:
        return "black"; // Default color for other statuses
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6">
          Select Group to Load Group Attendance Data
        </Typography>
      </Box>
    );
  }

  if (attendanceData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6">No Data Available</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Stack display="flex" flexDirection="row" justifyContent="flex-end">
        <AdminReportExcel
          data={data?.result}
          fileName="Attendance Report"
        ></AdminReportExcel>
      </Stack>
      <Box height={10} />
      <AttendanceTableComponent columns={columns} data={formattedData} />
    </div>
  );
};

export default AdminGroupReport;
