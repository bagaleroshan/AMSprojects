import { FC } from "react";
import { CSVLink } from "react-csv";

interface DataItem {
  id: string;
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
}

interface ExportCSVProps {
  data: DataItem[];
  fileName: string;
}

const ExportCSV: FC<ExportCSVProps> = ({ data, fileName }) => {
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
      className="btn btn-primary"
      target="_blank"
    >
      Export to CSV
    </CSVLink>
  );
};

export default ExportCSV;
