import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";
import MuiLoadingButtonTheme from "../../component/theme/MuiLoadingButtonTheme";
import { storeAttendance } from "../../features/attendanceSlice";
import { showSuccessToast } from "../../muiModals/toastConfig";
import { useTakeAttendanceMutation } from "../../services/api/AttendanceService";
import { RootState } from "../../store/store";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";

interface AttendanceRecord {
  date?: string;
  groupId?: string;
  studentId?: string;
  status: string;
  id?: number;
}

interface AttendanceTableProps {
  attendanceRecord: AttendanceRecord[];
}

type StudentAttendance = {
  studentId: string;
  [key: string]: string | number;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceRecord,
}) => {
  console.log("attendanceRecord*******", attendanceRecord);
  const { id } = useParams();
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttendanceTaken, setIsAttendanceTaken] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const todaysAttendance = useSelector((store: RootState) => store.attendance);
  console.log("todayAttendance", todaysAttendance);

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

  const getToday = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };
  const today = useMemo(() => getToday(), []);

  const getLastNDays = (n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates.reverse(); // Reverse the array to display latest date first
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

      const todayFormatted = new Date().toISOString().split("T")[0];
      return Object.keys(attendanceByStudent).map((studentId) => ({
        studentId,
        ...lastThreeDays.reduce((acc, date) => {
          acc[date] = attendanceByStudent[studentId][date] || "-";
          return acc;
        }, {} as { [key: string]: string }),
        present: "P",
        absentDays: Object.values(attendanceByStudent[studentId]).filter(
          (status) => status === "A"
        ).length,
        [todayFormatted]: attendanceByStudent[studentId][todayFormatted] || "-",
      }));
    },
    [lastThreeDays]
  );

  useEffect(() => {
    if (attendanceRecord && attendanceRecord.length > 0) {
      const processedAttendance = processAttendanceData(attendanceRecord);
      setAttendance(processedAttendance);
    }
  }, [attendanceRecord, processAttendanceData]);

  const toggleAttendance = useCallback(
    (index) => {
      setAttendance((prevAttendance) =>
        prevAttendance.map((attendanceData, i) =>
          i === index
            ? {
                ...attendanceData,
                present: attendanceData.present === "P" ? "A" : "P",
              }
            : attendanceData
        )
      );
    },
    [setAttendance]
  );

  const handleButtonClick = async () => {
    setIsLoading(true);
    const attendanceData = attendance.map((student) => ({
      studentId: student.studentId,
      status: student.present || "P",
    }));

    const results = {
      date: currentDate,
      attendance: attendanceData,
    };

    try {
      await takeAttendance({ id, data: results });
      dispatch(storeAttendance({ data: results }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(`Error recording attendance: ${error}`);
    }
  };

  useMemo(() => {
    if (!attendanceRecord || attendanceRecord.length === 0) {
      setIsAttendanceTaken(false);
    } else {
      const isTaken = attendanceRecord.some(
        (value) =>
          new Date(value.date).toISOString().split("T")[0] === currentDate
      );
      setIsAttendanceTaken(isTaken);
    }
  }, [attendanceRecord, currentDate]);

  const columns = useMemo(() => {
    if (isAttendanceTaken) {
      return [
        {
          Header: "Student Name",
          accessor: "studentId",
        },
        ...lastThreeDays.map((date) => ({
          Header: date,
          accessor: date,
          Cell: ({ row }) => <span>{row.original[date]}</span>,
        })),
        {
          Header: today,
          accessor: today,
          Cell: ({ row }) => <span>{row.original[today]}</span>,
        },
        {
          Header: "Absent Days",
          accessor: "absentDays",
          Cell: ({ row }) => <span>{row.original.absentDays}</span>,
        },
      ];
    } else {
      return [
        {
          Header: "Student Name",
          accessor: "studentId",
        },
        ...lastThreeDays.map((date) => ({
          Header: date,
          accessor: date,
          Cell: ({ row }) => <span>{row.original[date]}</span>,
        })),
        {
          Header: "Take Attendance",
          accessor: "present",
          Cell: ({ row }) => {
            const handleClick = () => {
              if (!isAttendanceTaken) {
                toggleAttendance(row.index);
              }
            };
            return (
              <span
                onClick={handleClick}
                style={{
                  cursor: !isAttendanceTaken ? "pointer" : "default",
                  color: "black",
                }}
              >
                {row.original.present}
              </span>
            );
          },
        },
        {
          Header: "Absent Days",
          accessor: "absentDays",
          Cell: ({ row }) => <span>{row.original.absentDays}</span>,
        },
      ];
    }
  }, [lastThreeDays, toggleAttendance, isAttendanceTaken, todaysAttendance]);

  const data = useMemo(() => attendance, [attendance]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
        buttonName={isAttendanceTaken ? "Attendance Recorded" : "Log Attendance"}
        isLoading={isLoading}
        onClick={!isAttendanceTaken ? handleButtonClick : undefined}
        disabled={isAttendanceTaken}
      />
    </div>
  );
};

export default AttendanceTable;
