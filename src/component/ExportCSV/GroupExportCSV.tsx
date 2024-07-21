import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import { LightTooltip } from "../theme/MuiSidebarTheme";
import { GroupExportExcelProps } from "../interfaces/GroupInterface";

const GroupExportExcel: FC<GroupExportExcelProps> = ({ data, fileName }) => {
  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Group Data");

    // Define columns
    const columns = [
      { header: "Id", key: "id" },
      { header: "Group Name", key: "groupName" },
      { header: "Subject Name", key: "subjectName" },
      { header: "Teacher Name", key: "teacherName" },
    ];

    // Set columns in the worksheet
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: col.header.length + 5, // Initial width based on header length
    }));

    // Format header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF00FF00" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add data rows
    data.forEach((item) => {
      worksheet
        .addRow({
          id: item.id,
          groupName: item.groupName,
          subjectName: item?.subject?.subjectName,
          teacherName: item?.teacher?.fullName,
        })
        .eachCell((cell, colNumber) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
          // Adjust column width based on the cell content length
          const column = worksheet.getColumn(colNumber);
          const cellLength = cell.value ? cell.value.toString().length : 10;
          if (column.width < cellLength + 2) {
            column.width = cellLength + 2; // Adding padding to width
          }
        });
    });

    // // Add "Hello World" row at the bottom
    // const lastRowIndex = worksheet.rowCount + 1;
    // worksheet.addRow(["Hello World"]).eachCell((cell) => {
    //   cell.font = { bold: true };
    //   cell.alignment = { vertical: "middle", horizontal: "center" };
    // });

    // // Merge cells in the "Hello World" row to span across all columns
    // worksheet.mergeCells(`A${lastRowIndex}:D${lastRowIndex}`);

    // // Make all cells in the first column bold
    // worksheet.getColumn(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    // });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <LightTooltip title="Download" placement="right">
      <FileDownloadIcon
        color="primary"
        onClick={handleExportExcel}
        style={{ cursor: "pointer" }}
      />
    </LightTooltip>
  );
};

export default GroupExportExcel;

// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import { FC } from "react";
// import { LightTooltip } from "../theme/MuiSidebarTheme";

// interface DataItem {
//   id: string;
//   groupName: string;
//   subject: {
//     subjectName: string;
//   };
//   teacher: {
//     fullName: string;
//   };
// }

// interface GroupExportExcelProps {
//   data: DataItem[];
//   fileName: string;
// }

// const GroupExportExcel: FC<GroupExportExcelProps> = ({ data, fileName }) => {
//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Group Data");

//     // Define columns
//     const columns = [
//       { header: "Id", key: "id" },
//       { header: "Group Name", key: "groupName" },
//       { header: "Subject Name", key: "subjectName" },
//       { header: "Teacher Name", key: "teacherName" },
//     ];

//     // Set columns in the worksheet
//     worksheet.columns = columns.map((col) => ({
//       header: col.header,
//       key: col.key,
//       width: col.header.length + 5, // Initial width based on header length
//     }));

//     // Format header row
//     worksheet.getRow(1).eachCell((cell) => {
//       cell.font = { bold: true };
//       cell.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "FF00FF00" },
//       };
//       cell.alignment = { vertical: "middle", horizontal: "center" };
//       cell.border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" },
//       };
//     });

//     // Add data rows
//     data.forEach((item) => {
//       worksheet.addRow({
//         id: item.id,
//         groupName: item.groupName,
//         subjectName: item?.subject?.subjectName,
//         teacherName: item?.teacher?.fullName,
//       }).eachCell((cell, colNumber) => {
//         cell.alignment = { vertical: "middle", horizontal: "center" };
//         // Adjust column width based on the cell content length
//         const column = worksheet.getColumn(colNumber);
//         const cellLength = cell.value ? cell.value.toString().length : 10;
//         if (column.width < cellLength + 2) {
//           column.width = cellLength + 2; // Adding padding to width
//         }
//       });
//     });

//     // Make all cells in the first column bold
//     worksheet.getColumn(1).eachCell((cell) => {
//       cell.font = { bold: true };
//     });

//     // Generate Excel file
//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   return (
//     <LightTooltip title="Download" placement="right">
//       <FileDownloadIcon
//         color="primary"
//         onClick={handleExportExcel}
//         style={{ cursor: "pointer" }}
//       />
//     </LightTooltip>
//   );
// };

// export default GroupExportExcel;
