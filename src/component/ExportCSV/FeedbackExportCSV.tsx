import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import { LightTooltip } from "../theme/MuiSidebarTheme";
import { FeedbackExportExcelProps } from "../interfaces/FeedbackInterface";

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
      width: col.header.length + 5, // Initial width based on header length
    }));

    // Format header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006497b1" }, // Dark Blue color
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
        .addRow(
          columns.reduce((acc, col) => {
            acc[col.key] = item[col.key];
            return acc;
          }, {} as { [key: string]: any })
        )
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
