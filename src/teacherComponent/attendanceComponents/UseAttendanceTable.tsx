import { AttendanceTable } from "./AttendanceTableComponent";

export const UseAttendanceTable = () => {
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
  ];

  return (
    <div>
      <h1>Attendance</h1>
      <AttendanceTable students={students} />
    </div>
  );
};
