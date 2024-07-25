// import { Button } from "@mui/material";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import { FC } from "react";
// import { LightTooltip } from "../theme/MuiSidebarTheme";

// interface AttendanceItem {
//   date: string;
//   status: string;
// }

// interface DataItem {
//   studentName: string;
//   attendance: AttendanceItem[];
// }

// interface UserExportCSVProps {
//   data: DataItem[];
//   fileName: string;
//   groupName?: string;
//   teacherName: string;
//   subject: string;
// }

// const AdminReportExcel: FC<UserExportCSVProps> = ({
//   data,
//   fileName,
//   teacherName,
//   subject,
//   // groupName,
// }) => {
//   console.log("dtaaaaaaaaa", data);
//   const handleDownload = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Admin Report");

//     // const titleRow = worksheet.addRow([`Attendance Report-${groupName}`]);
//     const titleRow = worksheet.addRow([`Attendance Report`]);

//     titleRow.font = { name: "Arial", size: 20, bold: true };
//     worksheet.mergeCells("A1", "B1");
//     titleRow.alignment = { vertical: "middle", horizontal: "center" };

//     const formatDate = (dateString: string) => {
//       const date = new Date(dateString);
//       const options: Intl.DateTimeFormatOptions = {
//         month: "long",
//         day: "numeric",
//       };
//       return date.toLocaleDateString(undefined, options);
//     };

//     const allDates = data?.flatMap((item) =>
//       item.attendance.map((att) => att.date)
//     );
//     const uniqueDates = Array.from(new Set(allDates));
//     const formattedDates = uniqueDates.map(formatDate);

//     const headerRow = ["Student Name", ...formattedDates];
//     worksheet.addRow(headerRow);

//     data.forEach((item) => {
//       const attendanceMap = item.attendance.reduce((acc, att) => {
//         acc[att.date] = att.status;
//         return acc;
//       }, {} as Record<string, string>);

//       const row = [
//         item.studentName,
//         ...uniqueDates.map((date) => attendanceMap[date] || ""),
//       ];
//       worksheet.addRow(row);
//     });

//     worksheet.getRow(2).eachCell((cell) => {
//       cell.font = { bold: true };
//       cell.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "006497b1" },
//       };
//       cell.alignment = { vertical: "middle", horizontal: "center" };
//     });

//     worksheet.columns.forEach((column) => {
//       let maxLength = 0;
//       column.eachCell({ includeEmpty: true }, (cell) => {
//         const columnLength = cell.value ? cell.value.toString().length : 10;
//         if (columnLength > maxLength) {
//           maxLength = columnLength;
//         }
//       });
//       column.width = maxLength + 2;
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   return (
//     <LightTooltip title="Download" placement="right">
//       {/* <FileDownloadIcon
//         color="primary"
//         onClick={handleDownload}
//         style={{ cursor: "pointer" }}
//       /> */}
//       <Button
//         variant="contained"
//         onClick={handleDownload}
//         style={{ cursor: "pointer" }}
//       >
//         Download
//       </Button>
//     </LightTooltip>
//   );
// };

// export default AdminReportExcel;

import { Button } from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import { LightTooltip } from "../theme/MuiSidebarTheme";
import { changeFirstName } from "../../utils/utils";

interface AttendanceItem {
  date: string;
  status: string;
}

interface DataItem {
  studentName: string;
  attendance: AttendanceItem[];
}

interface UserExportCSVProps {
  data: DataItem[];
  fileName: string;
  instructorName: string;
  subject: string;
}

const AdminReportExcel: FC<UserExportCSVProps> = ({
  data,
  fileName,
  instructorName,
  subject,
}) => {
  // console.log("data", data);

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Admin Report");

    // Add title
    const titleRow = worksheet.addRow(["Deerwalk Compware Limited"]);
    titleRow.font = { name: "Arial", size: 20, bold: true };
    worksheet.mergeCells("A1", "B1");
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Add instructor name and subject
    worksheet.addRow([`Instructor: ${changeFirstName(instructorName)}`]).font =
      {
        name: "Arial",
        size: 12,
        bold: true,
      };
    worksheet.addRow([`Subject: ${subject}`]).font = {
      name: "Arial",
      size: 12,
      bold: true,
    };
    worksheet.addRow([]);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString(undefined, options);
    };

    const allDates = data?.flatMap((item) =>
      item.attendance.map((att) => att.date)
    );
    const uniqueDates = Array.from(new Set(allDates));
    const formattedDates = uniqueDates.map(formatDate);

    const headerRow = ["Student Name", ...formattedDates];
    worksheet.addRow(headerRow);

    data.forEach((item) => {
      const attendanceMap = item.attendance.reduce((acc, att) => {
        acc[att.date] = att.status;
        return acc;
      }, {} as Record<string, string>);

      const row = [
        changeFirstName(item.studentName),
        ...uniqueDates.map((date) => attendanceMap[date] || ""),
      ];
      worksheet.addRow(row);
    });

    worksheet.getRow(5).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006497b1" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <LightTooltip title="Download" placement="right">
      <Button
        variant="contained"
        onClick={handleDownload}
        style={{ cursor: "pointer" }}
      >
        Download
      </Button>
    </LightTooltip>
  );
};

export default AdminReportExcel;
