import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";

export const AttendanceTable = ({ students }) => {
  console.log("students", students);
  const [takeAttendance] = useTakeAttendanceMutation();
  const { id } = useParams();
  const [attendance, setAttendance] = useState(
    students.map((student) => ({ ...student, present: "P" }))
  );

  const prevDate = students[0].date;

  // Memoize the toggleAttendance function
  const toggleAttendance = useCallback(
    (index) => {
      setAttendance((prevAttendance) =>
        prevAttendance.map((student, i) =>
          i === index ? { ...student, present: "A" } : student
        )
      );
    },
    [setAttendance]
  );

  const handleButtonClick = async () => {
    const currentDate = new Date().toISOString();
    const attendanceData = attendance.map((student) => ({
      studentId: student.id,
      status: student.present,
    }));

    const results = {
      date: currentDate,
      attendance: attendanceData,
    };
    console.log("results*****", results);

    try {
      await takeAttendance({ id: id, data: results });
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "fullName",
      },
      {
        Header: prevDate,
        accessor: "status",
        Cell: ({ status }) => (status ? "P" : "A"),
      },
      {
        Header: "Present",
        accessor: "present",
        Cell: ({ row }) => (
          <span
            onClick={() => toggleAttendance(row.index)}
            style={{ cursor: "pointer" }}
          >
            {row.original.present}
          </span>
        ),
      },
      {
        Header: "Absent Days",
        accessor: "absentDays",
        Cell: ({ row }) => {
          const absentDays = row.original.status === false ? 1 : 0;
          return absentDays;
        },
      },
    ],
    [toggleAttendance]
  );

  const data = useMemo(() => attendance, [attendance]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <MuiLoadingButtonTheme
        buttonName="Log Attendance"
        isLoading={false}
        onClick={handleButtonClick}
      />
      {/* <button onClick={handleButtonClick}>Log Attendance</button> */}
    </div>
  );
};
