// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useTable } from "react-table";
// import { toast } from "react-toastify";
// import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
// import { showSuccessToast } from "../../muiModals/toastConfig";
// import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";
// import { useReadGroupByIdQuery } from "../../services/api/GroupService";
// import {
//   getErrorMessage,
//   isFetchBaseQueryError,
//   isSerializedError,
// } from "../../utils/utils";

// type AttendanceRecord = {
//   date: string;
//   groupId: string;
//   studentId: string;
//   status: string;
// };

// type StudentAttendance = {
//   studentId: string;
//   attendance: Array<{ date: string; status: string }>;
// };

// const AttendanceTable = ({
//   attendanceRecord,
// }: {
//   attendanceRecord: AttendanceRecord[];
// }) => {
//   console.log("AttendanceRecord*************", attendanceRecord);
//   const { id } = useParams();
//   const [attendance, setAttendance] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state

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

//   const {
//     isError: isErrorReadGroupById,
//     data: GroupById,
//     error: errorReadGroupById,
//   } = useReadGroupByIdQuery(id);

//   useEffect(() => {
//     if (isErrorReadGroupById) {
//       if (isFetchBaseQueryError(errorReadGroupById)) {
//         toast.error(getErrorMessage(errorReadGroupById));
//       } else if (isSerializedError(errorReadGroupById)) {
//         toast.error(errorReadGroupById?.message);
//       } else {
//         toast.error("Unknown Error");
//       }
//     }
//   }, [isErrorReadGroupById, errorReadGroupById]);

//   const getLastNDays = (n: number) => {
//     const dates = [];
//     for (let i = 1; i <= n; i++) {
//       // Start from 1 to exclude today's date
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       dates.push(date.toISOString().split("T")[0]);
//     }
//     return dates.reverse(); // Reverse to show latest date first
//   };

//   const lastThreeDays = useMemo(() => getLastNDays(3), []);

//   const processAttendanceData = useCallback(
//     (records: AttendanceRecord[]) => {
//       const attendanceByStudent: { [key: string]: { [key: string]: string } } =
//         {};

//       records.forEach((record) => {
//         const { studentId, date, status } = record;
//         const formattedDate = new Date(date).toISOString().split("T")[0];

//         if (!attendanceByStudent[studentId]) {
//           attendanceByStudent[studentId] = {};
//         }
//         attendanceByStudent[studentId][formattedDate] = status;
//       });

//       return Object.keys(attendanceByStudent).map((studentId) => ({
//         studentId,
//         ...lastThreeDays.reduce((acc, date) => {
//           acc[date] = attendanceByStudent[studentId][date] || "N/A";
//           return acc;
//         }, {} as { [key: string]: string }),
//       }));
//     },
//     [lastThreeDays]
//   );

//   useEffect(() => {
//     if (attendanceRecord && attendanceRecord.length > 0) {
//       setAttendance(processAttendanceData(attendanceRecord));
//     }
//   }, [attendanceRecord, processAttendanceData]);

//   const toggleAttendance = useCallback((studentId: string, date: string) => {
//     setAttendance((prevAttendance) =>
//       prevAttendance.map((student) =>
//         student.studentId === studentId
//           ? {
//               ...student,
//               [date]: student[date] === "P" ? "A" : "P", // Toggle 'P' (Present) to 'A' (Absent) and vice versa
//             }
//           : student
//       )
//     );
//   }, []);

//   const handleTakeAttendance = async () => {
//     setIsLoading(true);
//     const currentDate = new Date().toISOString().split("T")[0];
//     const attendanceData = attendance.map((student) => ({
//       studentId: student.studentId,
//       status: student[currentDate] || "P", // Default status 'P' (Present)
//     }));

//     const results = {
//       date: currentDate,
//       attendance: attendanceData,
//     };

//     try {
//       await takeAttendance({ id, data: results });
//       setIsLoading(false);
//       showSuccessToast("Attendance recorded successfully!");
//     } catch (error) {
//       setIsLoading(false);
//       toast.error("Error recording attendance:", error);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Student ID",
//         accessor: "studentId",
//       },
//       ...lastThreeDays.map((date) => ({
//         Header: date,
//         accessor: date,
//       })),
//       {
//         Header: "Take Attendance",
//         accessor: "present",
//         Cell: ({ row }) => (
//           <span
//             onClick={() =>
//               toggleAttendance(row.original.studentId, lastThreeDays[0])
//             } // Assuming toggling today's attendance for the first date in lastThreeDays
//             style={{ cursor: "pointer" }}
//           >
//             {row.original[lastThreeDays[0]]}{" "}
//             {/* Display status for today's date */}
//           </span>
//         ),
//       },
//     ],
//     [lastThreeDays, toggleAttendance]
//   );

//   const data = useMemo(() => attendance, [attendance]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

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
//         onClick={handleTakeAttendance}
//       />
//     </div>
//   );
// };

// export default AttendanceTable;

/*          Everything except the take attendnace part */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
import { showSuccessToast } from "../../muiModals/toastConfig";
import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";
import { useReadGroupByIdQuery } from "../../services/api/GroupService";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

type AttendanceRecord = {
  date: string;
  groupId: string;
  studentId: string;
  status: string;
};

type StudentAttendance = {
  studentId: string;
  attendance: Array<{ date: string; status: string }>;
};

const AttendanceTable = ({
  attendanceRecord,
}: {
  attendanceRecord: AttendanceRecord[];
}) => {
  console.log("AttendanceRecord*************", attendanceRecord);
  const { id } = useParams();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const [
    takeAttendance,
    {
      isError: isErrorTakeAttendance,
      error: errorTakeAttendance,
      isSuccess: isSuccessTakeAttendance,
      data: dataTakeAttendance,
    },
  ] = useTakeAttendanceMutation();

  useEffect(() => {
    if (isErrorTakeAttendance) {
      if (isFetchBaseQueryError(errorTakeAttendance)) {
        toast.error(getErrorMessage(errorTakeAttendance), { autoClose: 5000 });
      } else if (isSerializedError(errorTakeAttendance)) {
        toast.error(errorTakeAttendance?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorTakeAttendance, errorTakeAttendance]);

  useEffect(() => {
    if (isSuccessTakeAttendance) {
      showSuccessToast(dataTakeAttendance.message);
    }
  }, [isSuccessTakeAttendance, dataTakeAttendance]);

  const {
    isError: isErrorReadGroupById,
    data: GroupById,
    error: errorReadGroupById,
  } = useReadGroupByIdQuery(id);

  useEffect(() => {
    if (isErrorReadGroupById) {
      if (isFetchBaseQueryError(errorReadGroupById)) {
        toast.error(getErrorMessage(errorReadGroupById));
      } else if (isSerializedError(errorReadGroupById)) {
        toast.error(errorReadGroupById?.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorReadGroupById, errorReadGroupById]);

  const getLastNDays = (n: number) => {
    const dates = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const lastThreeDays = useMemo(() => getLastNDays(3), []);

  const processAttendanceData = useCallback(
    (records: AttendanceRecord[]) => {
      const attendanceByStudent: { [key: string]: { [key: string]: string } } =
        {};

      records.forEach((record) => {
        const { studentId, date, status } = record;
        const formattedDate = new Date(date).toISOString().split("T")[0];

        if (!attendanceByStudent[studentId]) {
          attendanceByStudent[studentId] = {};
        }
        attendanceByStudent[studentId][formattedDate] = status;
      });

      return Object.keys(attendanceByStudent).map((studentId) => ({
        studentId,
        ...lastThreeDays.reduce((acc, date) => {
          acc[date] = attendanceByStudent[studentId][date] || "N/A";
          return acc;
        }, {} as { [key: string]: string }),
      }));
    },
    [lastThreeDays]
  );

  useEffect(() => {
    if (attendanceRecord && attendanceRecord.length > 0) {
      setAttendance(processAttendanceData(attendanceRecord));
    }
  }, [attendanceRecord, processAttendanceData]);

  const columns = useMemo(
    () => [
      {
        Header: "Student ID",
        accessor: "studentId",
      },
      ...lastThreeDays.map((date) => ({
        Header: date,
        accessor: date,
      })),
      {
        Header: "Take Attendance",
        accessor: "present",
        Cell: ({ row }) => (
          <span
            onClick={() => processAttendanceData(row.index)}
            style={{ cursor: "pointer" }}
          >
            {row.original.present}
          </span>
        ),
      },
    ],
    [lastThreeDays]
  );

  const data = useMemo(() => attendance, [attendance]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleButtonClick = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString();
    const attendanceData = attendance.map((student) => ({
      studentId: student.studentId,
      status: student[currentDate.split("T")[0]] || "P",
    }));

    const results = {
      date: currentDate,
      attendance: attendanceData,
    };

    try {
      await takeAttendance({ id, data: results });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error recording attendance:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
};

export default AttendanceTable;
