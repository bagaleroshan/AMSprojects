import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import { stripHtmlTagsCSV } from "../../utils/utils";
import { FeedbackExportExcelProps } from "../interfaces/FeedbackInterface";
import { LightTooltip } from "../theme/MuiSidebarTheme";

const FeedbackExportExcel: FC<FeedbackExportExcelProps> = ({
  data,
  columns,
  fileName,
}) => {
  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Group Data");

    // Set columns in the worksheet
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: 5, // Initial width based on header length
    }));

    // Set the height for the header row
    worksheet.getRow(1).height = 200;

    // Format header row
    columns.forEach((col, index) => {
      const cell = worksheet.getCell(1, index + 1); // Get cell at header row

      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006497b1" }, // Dark Blue color
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        textRotation: index === 0 || index === columns.length - 1 ? 0 : 90, // 0 degrees for first and last columns, 90 for others
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add data rows and merge cells for the "Training Shift (Time)" column
    let currentRow = 2;
    let startRow = 2;
    let currentTime = data.length > 0 ? data[0].time : null;

    data.forEach((item, index) => {
      const time = item.time;
      if (time !== currentTime) {
        worksheet.mergeCells(`A${startRow}:A${currentRow - 1}`);
        currentTime = time;
        startRow = currentRow;
      }

      const row = worksheet.addRow(
        columns.reduce((acc, col) => {
          acc[col.key] = stripHtmlTagsCSV(item[col.key]);
          return acc;
        }, {} as { [key: string]: any })
      );

      row.eachCell((cell, colNumber) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        // Adjust column width based on the cell content length
        const column = worksheet.getColumn(colNumber);
        const cellLength = cell.value ? cell.value.toString().length : 10;
        if (column.width < cellLength + 2) {
          column.width = cellLength + 2; // Adding padding to width
        }
      });

      currentRow++;
    });

    // Merge the last set of cells if necessary
    if (startRow < currentRow) {
      worksheet.mergeCells(`A${startRow}:A${currentRow - 1}`);
    }

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

export default FeedbackExportExcel;

// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import { FC } from "react";
// import { stripHtmlTagsCSV } from "../../utils/utils";
// import { FeedbackExportExcelProps } from "../interfaces/FeedbackInterface";
// import { LightTooltip } from "../theme/MuiSidebarTheme";

// const FeedbackExportExcel: FC<FeedbackExportExcelProps> = ({
//   data,
//   columns,
//   fileName,
// }) => {
//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Group Data");

//     // Set columns in the worksheet
//     worksheet.columns = columns.map((col) => ({
//       header: col.header,
//       key: col.key,
//       width: 5, // Initial width based on header length
//       // width: col.header.length + 5, // Initial width based on header length
//     }));

//     // Set the height for the header row
//     worksheet.getRow(1).height = 200;

//     // Format header row
//     worksheet.getRow(1).eachCell((cell) => {
//       cell.font = { bold: true };
//       cell.fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "006497b1" }, // Dark Blue color
//       };
//       cell.alignment = {
//         // vertical: "middle",
//         // horizontal: "center",
//         textRotation: 90,
//       };
//       cell.border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" },
//       };
//     });

//     // Add data rows and merge cells for the "Training Shift (Time)" column
//     let currentRow = 2;
//     let startRow = 2;
//     let currentTime = data.length > 0 ? data[0].time : null;

//     data.forEach((item, index) => {
//       const time = item.time;
//       if (time !== currentTime) {
//         worksheet.mergeCells(`A${startRow}:A${currentRow - 1}`);
//         currentTime = time;
//         startRow = currentRow;
//       }

//       const row = worksheet.addRow(
//         columns.reduce((acc, col) => {
//           acc[col.key] = stripHtmlTagsCSV(item[col.key]);
//           return acc;
//         }, {} as { [key: string]: any })
//       );

//       row.eachCell((cell, colNumber) => {
//         cell.alignment = { vertical: "middle", horizontal: "center" };
//         // Adjust column width based on the cell content length
//         const column = worksheet.getColumn(colNumber);
//         const cellLength = cell.value ? cell.value.toString().length : 10;
//         if (column.width < cellLength + 2) {
//           column.width = cellLength + 2; // Adding padding to width
//         }
//       });

//       currentRow++;
//     });

//     // Merge the last set of cells if necessary
//     if (startRow < currentRow) {
//       worksheet.mergeCells(`A${startRow}:A${currentRow - 1}`);
//     }

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

// export default FeedbackExportExcel;

// // Add data rows
// data.forEach((item) => {
//   worksheet
//     .addRow(
//       columns.reduce((acc, col) => {
//         acc[col.key] = stripHtmlTagsCSV(item[col.key]);
//         return acc;
//       }, {} as { [key: string]: any })
//     )
//     .eachCell((cell, colNumber) => {
//       cell.alignment = { vertical: "middle", horizontal: "center" };
//       // Adjust column width based on the cell content length
//       const column = worksheet.getColumn(colNumber);
//       const cellLength = cell.value ? cell.value.toString().length : 10;
//       if (column.width < cellLength + 2) {
//         column.width = cellLength + 2; // Adding padding to width
//       }
//     });
// });

// Estimate the height needed for the header row
// const headerLength = Math.max(...columns.map((col) => col.header.length));
// const estimatedHeight = Math.max(30, headerLength * 10); // Height estimate (30 or length * 2)
// console.log("estimatedHeight", estimatedHeight);
