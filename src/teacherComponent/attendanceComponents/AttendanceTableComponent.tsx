// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useTable } from "react-table";
// import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
// import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";
// import {
//   getErrorMessage,
//   isFetchBaseQueryError,
//   isSerializedError,
// } from "../../utils/utils";
// import { toast } from "react-toastify";
// import { showSuccessToast } from "../../muiModals/toastConfig";

// const AttendanceTable = ({ students }) => {
//   const { id } = useParams();
//   const [attendance, setAttendance] = useState([]);

//   const [
//     takeAttendance,
//     {
//       isError: isErrorTakeAttendance,
//       error: errorTakeAttendance,
//       isSuccess: isSuccessTakeAttendance,
//       data: dataTakeAttendance,
//     },
//   ] = useTakeAttendanceMutation();

//   useEffect(() => {
//     if (isErrorTakeAttendance) {
//       if (isFetchBaseQueryError(errorTakeAttendance)) {
//         toast.error(getErrorMessage(errorTakeAttendance), { autoClose: 5000 });
//       } else if (isSerializedError(errorTakeAttendance)) {
//         toast.error(errorTakeAttendance?.message, { autoClose: 5000 });
//       } else {
//         toast.error("Unknown Error", { autoClose: 5000 });
//       }
//     }
//   }, [isErrorTakeAttendance, errorTakeAttendance]);

//   useEffect(() => {
//     if (isSuccessTakeAttendance) {
//       showSuccessToast(dataTakeAttendance.message);
//     }
//   }, [isSuccessTakeAttendance, dataTakeAttendance]);

//   useEffect(() => {
//     if (students && students.length > 0) {
//       setAttendance(students.map((student) => ({ ...student, present: "P" })));
//     }
//   }, [students]);

//   // const prevDate = useMemo(() => {
//   //   return students && students.length > 0 ? students[0].date : "Previous Date";
//   // }, [students]);

//   const prevDate = useMemo(() => {
//     if (!students || students.length === 0) {
//       return "Previous Date";
//     }

//     const dates = students
//       .map((student) => new Date(student.date))
//       .filter((date) => !isNaN(date));

//     const latestDate =
//       dates.length > 0 ? new Date(Math.max(...dates)) : "Previous Date";
//     return latestDate !== "Previous Date"
//       ? latestDate.toDateString()
//       : latestDate;
//   }, [students]);

//   const toggleAttendance = useCallback(
//     (index) => {
//       setAttendance((prevAttendance) =>
//         prevAttendance.map((student, i) =>
//           i === index
//             ? { ...student, present: student.present === "P" ? "A" : "P" }
//             : student
//         )
//       );
//     },
//     [setAttendance]
//   );

//   const handleButtonClick = async () => {
//     const currentDate = new Date().toISOString();
//     const attendanceData = attendance.map((student) => ({
//       studentId: student.id,
//       present: student.present,
//     }));

//     const results = {
//       date: currentDate,
//       attendance: attendanceData,
//     };

//     try {
//       await takeAttendance({ id, data: results });
//     } catch (error) {
//       console.error("Error recording attendance:", error);
//     }
//   };

//   console.log("Studentssss", students);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Student Name",
//         accessor: "fullName",
//       },
//       {
//         Header: prevDate || "Status",
//         accessor: "status",
//       },
//       {
//         Header: "Take Attendance",
//         accessor: "present",
//         Cell: ({ row }) => (
//           <span
//             onClick={() => toggleAttendance(row.index)}
//             style={{ cursor: "pointer" }}
//           >
//             {row.original.present}
//           </span>
//         ),
//       },
//       {
//         Header: "Absent Days",
//         accessor: "absentDays",
//         Cell: ({ row }) => {
//           const status = row.original.status || [];
//           const absentDays = Array.isArray(status)
//             ? status.filter((s) => s === "A").length
//             : 0;
//           return absentDays;
//         },
//       },
//     ],
//     [toggleAttendance, prevDate]
//   );

//   const data = useMemo(() => attendance, [attendance]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <div>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <MuiLoadingButtonTheme
//         buttonName="Log Attendance"
//         isLoading={false}
//         onClick={handleButtonClick}
//       />
//     </div>
//   );
// };

// export default AttendanceTable;

// import { useCallback, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useTable } from "react-table";
// import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
// import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";
// import {
//   getErrorMessage,
//   isFetchBaseQueryError,
//   isSerializedError,
// } from "../../utils/utils";
// import { toast } from "react-toastify";
// import { showSuccessToast } from "../../muiModals/toastConfig";

// const AttendanceTable = ({ students }) => {
//   const { id } = useParams();
//   const [attendance, setAttendance] = useState([]);

//   const [
//     takeAttendance,
//     {
//       isError: isErrorTakeAttendance,
//       error: errorTakeAttendance,
//       isSuccess: isSuccessTakeAttendance,
//       data: dataTakeAttendance,
//     },
//   ] = useTakeAttendanceMutation();

//   useEffect(() => {
//     if (isErrorTakeAttendance) {
//       if (isFetchBaseQueryError(errorTakeAttendance)) {
//         toast.error(getErrorMessage(errorTakeAttendance), { autoClose: 5000 });
//       } else if (isSerializedError(errorTakeAttendance)) {
//         toast.error(errorTakeAttendance?.message, { autoClose: 5000 });
//       } else {
//         toast.error("Unknown Error", { autoClose: 5000 });
//       }
//     }
//   }, [isErrorTakeAttendance, errorTakeAttendance]);

//   useEffect(() => {
//     if (isSuccessTakeAttendance) {
//       showSuccessToast(dataTakeAttendance.message);
//     }
//   }, [isSuccessTakeAttendance, dataTakeAttendance]);

//   useEffect(() => {
//     if (students && students.length > 0) {
//       setAttendance(students.map((student) => ({ ...student, present: "P" })));
//     }
//   }, [students]);

//   // const prevDate = useMemo(() => {
//   //   return students && students.length > 0 ? students[0].date : "Previous Date";
//   // }, [students]);

//   const prevDate = useMemo(() => {
//     if (!students || students.length === 0) {
//       return "Previous Date";
//     }

//     const dates = students
//       .map((student) => new Date(student.date))
//       .filter((date) => !isNaN(date));

//     const latestDate =
//       dates.length > 0 ? new Date(Math.max(...dates)) : "Previous Date";
//     return latestDate !== "Previous Date"
//       ? latestDate.toDateString()
//       : latestDate;
//   }, [students]);

//   const toggleAttendance = useCallback(
//     (index) => {
//       setAttendance((prevAttendance) =>
//         prevAttendance.map((student, i) =>
//           i === index
//             ? { ...student, present: student.present === "P" ? "A" : "P" }
//             : student
//         )
//       );
//     },
//     [setAttendance]
//   );

//   const handleButtonClick = async () => {
//     const currentDate = new Date().toISOString();
//     const attendanceData = attendance.map((student) => ({
//       studentId: student.id,
//       status: student.present,
//     }));

//     const results = {
//       date: currentDate,
//       attendance: attendanceData,
//     };

//     try {
//       await takeAttendance({ id, data: results });
//     } catch (error) {
//       console.error("Error recording attendance:", error);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Student Name",
//         accessor: "fullName",
//       },
//       {
//         Header: prevDate || "Status",
//         accessor: "status",
//       },
//       {
//         Header: "Take Attendance",
//         accessor: "present",
//         Cell: ({ row }) => (
//           <span
//             onClick={() => toggleAttendance(row.index)}
//             style={{ cursor: "pointer" }}
//           >
//             {row.original.present}
//           </span>
//         ),
//       },
//       {
//         Header: "Absent Days",
//         accessor: "absentDays",
//         Cell: ({ row }) => {
//           const status = row.original.status || [];
//           const absentDays = Array.isArray(status)
//             ? status.filter((s) => s === "A").length
//             : 0;
//           return absentDays;
//         },
//       },
//     ],
//     [toggleAttendance, prevDate]
//   );

//   const data = useMemo(() => attendance, [attendance]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <div>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <MuiLoadingButtonTheme
//         buttonName="Log Attendance"
//         isLoading={false}
//         onClick={handleButtonClick}
//       />
//     </div>
//   );
// };

// export default AttendanceTable;

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
  console.log(students);
  // const prevDate = students[-1].date || [];
  const prevDate = students.length > 0 ? students[0].date : students.date;
  // const prevDate = useMemo(() => {
  //   return students && students.length > 0 ? students[0].date : "Previous Date";
  // }, [students]);

  // Memoize the toggleAttendance function
  const toggleAttendance = useCallback(
    (index) => {
      setAttendance((prevAttendance) =>
        prevAttendance.map((student, i) =>
          i === index
            ? { ...student, present: student.present === "P" ? "A" : "P" }
            : student
        )
      );
    },
    [setAttendance]
  );

  const handleButtonClick = async () => {
    const currentDate = new Date().toISOString();
    const attendanceData = attendance.map((student) => ({
      studentId: student.id,
      status: student.status,
    }));

    const results = {
      date: currentDate,
      attendance: attendanceData,
    };
    // console.log("results*****", results);

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
        Header: prevDate || "Status",
        accessor: "status",
      },
      {
        Header: "Take Attendance",
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
          const attendanceStatus = Array.isArray(row.original.status)
            ? row.original.status
            : [];
          const count = attendanceStatus.reduce((prev, value) => {
            return value === "A" ? prev + 1 : prev;
          }, 0);
          return count;
        },
      },
    ],
    [toggleAttendance, prevDate]
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

export default AttendanceTable;
