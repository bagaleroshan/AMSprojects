import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import AdminReportExcel from "../component/ExportCSV/AdminRepordExcel";
import { useReadAllAttendanceQuery } from "../services/api/AttendanceService";
import AttendanceTableComponent from "../teacherComponent/attendanceComponents/AttendanceTableComponent";
import { changeFirstName, formatTimeRangeToLocale } from "../utils/utils";

const AdminGroupReport = ({ groupId }) => {
  const { data, isLoading, error, refetch } =
    useReadAllAttendanceQuery(groupId);

  useEffect(() => {
    // Trigger refetch when groupId changes or on initial load
    refetch();
  }, [groupId, refetch]);

  const attendanceData = data?.result?.data || [];
  console.log("attendanceDataDownload ***", data?.result);

  const subjectName = data?.result?.subjectName;
  const teacherName = data?.result?.teacherName;
  const groupName = data?.result?.groupName;
  const startTime = data?.result?.startTime;
  const endTime = data?.result?.endTime;

  // console.log(formatTimeRangeToLocale(startTime, endTime));
  // console.log("startTime", startTime + "endTime", endTime);

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
        <div
          style={{
            backgroundColor:
              value === "P" ? "green" : value === "A" ? "red" : "grey",
            color: "white",
            padding: "0.5rem",
            margin: "5px",
            textAlign: "center",
          }}
        >
          {value || "-"}
        </div>
      ),
    }));

    return [
      {
        Header: "Student Name",
        accessor: "studentName",
        Cell: ({ value }) => <span>{changeFirstName(value)}</span>,
      },
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
      <Stack display="flex" flexDirection="row" justifyContent="end">
        <AdminReportExcel
          data={attendanceData}
          subject={subjectName}
          groupName={groupName}
          time={formatTimeRangeToLocale(startTime, endTime)}
          instructorName={teacherName}
          fileName="Attendance Report"
        />
      </Stack>
      <Box height={10} />
      <AttendanceTableComponent columns={columns} data={formattedData} />
    </div>
  );
};

export default AdminGroupReport;
