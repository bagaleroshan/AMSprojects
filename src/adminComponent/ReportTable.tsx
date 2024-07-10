import React, { useMemo } from "react";
import AttendanceTableComponent from "../teacherComponent/attendanceComponents/AttendanceTableComponent";
import { useReadAllAttendanceQuery } from "../services/api/AttendanceService";

const ReportTable = ({ id }) => {
  const groupId = id?.selectedGroupId || "abc";
  const { data } = useReadAllAttendanceQuery(groupId);

  const attendanceData = data?.result || [];
  // console.log(attendanceData)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const columns = useMemo(() => {
    if (attendanceData.length === 0) return [];

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
      attendance: student.attendance,
    }));
  }, [attendanceData]);

  return (
    <div>
      <AttendanceTableComponent columns={columns} data={formattedData} />
    </div>
  );
};

export default ReportTable;
