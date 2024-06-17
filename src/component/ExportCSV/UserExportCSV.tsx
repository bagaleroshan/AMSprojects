import { FC } from "react";
import { CSVLink } from "react-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import './styles.css';
import { LightTooltip } from "../theme/MuiSidebarTheme";
interface DataItem {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface UserExportCSVProps {
  data: DataItem[];
  fileName: string;
}

const UserExportCSV: FC<UserExportCSVProps> = ({ data, fileName }) => {
  const columns = [
    { label: "Id", key: "id" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "phoneNumber" },
    { label: "Role", key: "role" },
  ];

  return (
    <>
      <CSVLink
        data={data}
        headers={columns}
        filename={`${fileName}.csv`}
        
        target="_blank"
      >
       <LightTooltip title="Download" placement="right">
        <FileDownloadIcon  color="primary" />
      </LightTooltip>
      </CSVLink>
    </>
  );
};

export default UserExportCSV;
