import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FC } from "react";
import { CSVLink } from "react-csv";
import { LightTooltip } from "../theme/MuiSidebarTheme";

// import "./styles.css";
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
  const columns = [
    { label: "Id", key: "id" },
    { label: "Name", key: "subjectName" },
    { label: "Code", key: "subjectCode" },
    { label: "Classes", key: "numberOfClasses" },
  ];

  return (
    <CSVLink
      data={data}
      headers={columns}
      filename={`${fileName}.csv`}
      // className="btn btn-primary"
      target="_blank"
    >
      <LightTooltip title="Download" placement="right">
        <FileDownloadIcon  color="primary" />
      </LightTooltip>
    </CSVLink>
  );
};

export default SubjectExportCSV;
