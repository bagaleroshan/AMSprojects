import { useMemo, useState } from "react";
import { useTable } from "react-table";

export const AttendanceTable = ({ students }) => {
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

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name",
      },
      {
        Header: "Absent Name",
        accessor: "id",
      },
      {
        Header: "Present",
        accessor: "present",
        width: "300px",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original.present}
            onChange={() => toggleAttendance(row.index)}
          />
        ),
      },
    ],
    [attendance]
  );

  const data = useMemo(() => attendance, [attendance]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
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
  );
};

// Sample usage
