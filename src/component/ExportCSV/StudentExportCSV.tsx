import { FC } from "react";
import { CSVLink } from "react-csv";

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
      className="btn btn-primary"
      target="_blank"
    >
      Download
    </CSVLink>
  );
};

export default StudentExportCSV;



