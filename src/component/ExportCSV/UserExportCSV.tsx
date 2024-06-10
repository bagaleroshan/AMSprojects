import { FC } from "react";
import { CSVLink } from "react-csv";

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
    { label: "Name", key: "name" },
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
        className="btn btn-primary"
        target="_blank"
      >
        Download
      </CSVLink>
    </>
  );
};

export default UserExportCSV;
