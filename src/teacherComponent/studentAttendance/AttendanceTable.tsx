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

const getStyles = (present) => {
  if (present === "P") {
    return { background: "green", color: "white", border: "1px solid white" };
  } else if (present === "A") {
    return { background: "red", color: "white", border: "1px solid white" };
  } else {
    return {}; // No additional styles in else condition
  }
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceRecord,
}) => {
  const { id } = useParams();
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttendanceTaken, setIsAttendanceTaken] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const todaysAttendance = useSelector((store: RootState) => store.attendance);

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
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
  };
  const today = useMemo(() => getToday(), []);

  const getLastNDays = (n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = `${date.getDate()} ${date.toLocaleString(
        "default",
        { month: "short" }
      )}`;
      dates.push(formattedDate);
    }
    return dates.reverse();
  };

  const lastThreeDays = useMemo(() => getLastNDays(3), []);

  const processAttendanceData = useCallback(
    (records: AttendanceRecord[]) => {
      const attendanceByStudent: { [key: string]: { [key: string]: string } } =
        {};

      records.forEach((record) => {
        const { studentId, date, status } = record;
        const formattedDate = new Date(date);
        const formattedDateString = `${formattedDate.getDate()} ${formattedDate.toLocaleString(
          "default",
          { month: "short" }
        )}`;

        if (!attendanceByStudent[studentId]) {
          attendanceByStudent[studentId] = {};
        }
        attendanceByStudent[studentId][formattedDateString] = status;
      });
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
        [today]: attendanceByStudent[studentId][today] || "-",
      }));
    },
    [lastThreeDays, today]
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
  console.log(attendanceRecord,"jenis")
  useMemo(() => {
    
    if (!attendanceRecord || attendanceRecord.length === 0) {
      setIsAttendanceTaken(false);
    } else {
      const isTaken = attendanceRecord.some(
        (value) =>
          new Date(value.attendance.map((date)=>{date.date})).toISOString().split("T")[0] === currentDate
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
          Cell: ({ row }) => {
            const styles = getStyles(row.original[date]);
            return (
              <span
                style={{
                  padding: 5,
                  ...styles,
                }}
              >
                {row.original[date]}
              </span>
            );
          },
        })),
        {
          Header: today,
          accessor: today,
          Cell: ({ row }) => {
            const styles = getStyles(row.original[today]);
            return (
              <span
                style={{
                  padding: 5,
                  ...styles,
                }}
              >
                {row.original[today]}
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
    } else {
      return [
        {
          Header: "Student Name",
          accessor: "studentId",
        },
        ...lastThreeDays.map((date) => ({
          Header: date,
          accessor: date,
          Cell: ({ row }) => {
            const styles = getStyles(row.original[date]);
            return (
              <span
                style={{
                  padding: 5,
                  ...styles,
                }}
              >
                {row.original[date]}
              </span>
            );
          },
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
                  color: row.original.present === "P" ? "green" : "red",
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
  }, [lastThreeDays, toggleAttendance, isAttendanceTaken, today]);

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
        buttonName={
          isAttendanceTaken ? "Attendance Recorded" : "Log Attendance"
        }
        isLoading={isLoading}
        onClick={!isAttendanceTaken ? handleButtonClick : undefined}
        disabled={isAttendanceTaken}
      />
    </div>
  );
};

export default AttendanceTable;
