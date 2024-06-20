import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import { useTakeAttendanceMutation } from "../../services/api/AttendanceSerice";

export const AttendanceTable = ({ students }) => {
  const [takeAttendance] = useTakeAttendanceMutation();
  const params = useParams();
  const [attendance, setAttendance] = useState(
    students.map((student) => ({ ...student, present: false }))
  );

  const toggleAttendance = (index) => {
    const updatedAttendance = attendance.map((student, i) => {
      if (i === index) {
        return { ...student, present: !student.present };
      }
      return student;
    });
    setAttendance(updatedAttendance);
  };

  const handleButtonClick = async () => {
    const currentDate = new Date().toISOString();
    const attendanceData = attendance.map((student) => ({
      studentId: student.id,
      present: student.present,
    }));

    const results = {
      date: currentDate,
      attendance: attendanceData,
    };
    console.log(results);

    try {
      await takeAttendance({ id: params.id, data: results });
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name",
      },
      {
        Header: "Student ID",
        accessor: "id",
      },
      {
        Header: "Present",
        accessor: "present",
        Cell: ({ row }) => (
          <span
            onClick={() => toggleAttendance(row.index)}
            style={{ cursor: "pointer" }}
          >
            {row.original.present ? "✅" : "❌"}
          </span>
        ),
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
      <button onClick={handleButtonClick}>Log Attendance</button>
    </div>
  );
};
