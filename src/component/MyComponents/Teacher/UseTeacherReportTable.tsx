import React, { useMemo } from "react";
import { useReadAllAttendanceQuery } from "../../../services/api/AttendanceService";
import AttendanceTableComponent from "../../../teacherComponent/attendanceComponents/AttendanceTableComponent";
import { changeFirstName } from "../../../utils/utils";

const UseTeacherReportTable = ({ groupId }) => {
  const { data } = useReadAllAttendanceQuery(groupId);
  const attendanceData = data?.result?.data || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const columns = useMemo(() => {
    if (attendanceData.length === 0) return [];

    const dateColumns = attendanceData[0].attendance.map((att, index) => ({
      Header: formatDate(att.date),
      accessor: `attendance[${index}].status`,
      Cell: ({ value }) => (
        <div
          style={{
            backgroundColor: value === "P" ? "green" : value === "A" ? "red" : "grey",
            color: "white",
            padding: "7px",
            margin:'5px',
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

  return (
    <div>
      <AttendanceTableComponent columns={columns} data={formattedData} />
    </div>
  );
};

export default UseTeacherReportTable;
