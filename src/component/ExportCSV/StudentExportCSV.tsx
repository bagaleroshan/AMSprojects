import { FC } from "react";
import { CSVLink } from "react-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import "./ExportCSV.css";
import { LightTooltip } from "../theme/MuiSidebarTheme";

interface DataItem {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface StudentExportCSVProps {
  data: DataItem[];
  fileName: string;
}

const StudentExportCSV: FC<StudentExportCSVProps> = ({ data, fileName }) => {
  const columns = [
    { label: "Id", key: "id" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "PhoneNumber", key: "phoneNumber" },
  ];

  return (
    <CSVLink
      data={data}
      headers={columns}
      filename={`${fileName}.csv`}
      target="_blank"
    >
      <LightTooltip title="Download" placement="right">
        <FileDownloadIcon color="primary" />
      </LightTooltip>
    </CSVLink>
  );
};

export default StudentExportCSV;
