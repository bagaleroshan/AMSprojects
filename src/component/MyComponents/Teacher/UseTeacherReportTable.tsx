import React, { useMemo } from "react";
import { useReadAllAttendanceQuery } from "../../../services/api/AttendanceService";
import AttendanceTableComponent from "../../../teacherComponent/attendanceComponents/AttendanceTableComponent";

const UseTeacherReportTable = (groupId) => {
  const { data } = useReadAllAttendanceQuery(groupId?.groupId);
  const attendanceData = data?.result?.data || [];
  console.log(attendanceData)
  console.log(attendanceData, "data");
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

export default UseTeacherReportTable;
