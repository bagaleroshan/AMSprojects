import React, { useMemo, useState } from "react";
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

  const handleButtonClick =  async() => {
    const currentDate = new Date().toLocaleDateString();
    await attendance.forEach(student => {
      
    console.log ({date:currentDate,attendance:{name:student.name,present:student.present}})
     
    });
   
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
          <span onClick={() => toggleAttendance(row.index)} style={{ cursor: "pointer" }}>
            {row.original.present ? "✅" : "❌"}
          </span>
        ),
      },
    ],
    [attendance]
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
