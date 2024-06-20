import { FC } from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { LightTooltip } from "../theme/MuiSidebarTheme";

interface DataItem {
  id: string;
  subjectName: string;
  subjectCode: string;
  numberOfClasses: string;
}

interface SubjectExportCSVProps {
  data: DataItem[];
  fileName: string;
}

const SubjectExportCSV: FC<SubjectExportCSVProps> = ({ data, fileName }) => {
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Subjects");

    const columns = [
      { header: "Id", key: "id" },
      { header: "Name", key: "subjectName" },
      { header: "Code", key: "subjectCode" },
      { header: "Classes", key: "numberOfClasses" },
    ];

    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key,
      width:
        Math.max(
          col.header.length,
          ...data.map(
            (item) => (item[col.key as keyof DataItem] as string).length
          )
        ) + 2, // Adding some padding for better appearance
    }));

    // Style the header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000FF" }, // Blue background color
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add data rows and set their alignment to center
    data.forEach((item) => {
      const row = worksheet.addRow(item);
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    // Make all cells in the first column bold
    worksheet.getColumn(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

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
        onClick={handleDownload}
        style={{ cursor: "pointer", fontSize:'35px' }}
        size="large"
      />
    </LightTooltip>
  );
};

export default SubjectExportCSV;
