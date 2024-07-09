import React, { useMemo, useEffect } from "react";
import { useReadAllAttendanceQuery } from "../services/api/AttendanceService";
import AttendanceTableComponent from "../teacherComponent/attendanceComponents/AttendanceTableComponent";
import { CircularProgress, Box, Typography } from "@mui/material";
import AdminReportExcel from "../component/ExportCSV/AdminRepordExcel";

const AdminGroupReport = ({ groupId }) => {
  const { data, isLoading, error, refetch } =
    useReadAllAttendanceQuery(groupId);

  useEffect(() => {
    // Trigger refetch when groupId changes or on initial load
    refetch();
  }, [groupId, refetch]);

  const attendanceData = data?.result || [];

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
        <Typography variant="h6" color="error">
          Select Group to Load Data
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <AdminReportExcel
        data={data?.result}
        fileName="Attendance Report"
        // attendanceData={data?.result}
        // groupName={groupId}
      ></AdminReportExcel>
      <AttendanceTableComponent columns={columns} data={formattedData} />
    </div>
  );
};

export default AdminGroupReport;
