import { FC } from "react";
import { CSVLink } from "react-csv";

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
      className="btn btn-primary"
      target="_blank"
    >
      Download
    </CSVLink>
  );
};

export default SubjectExportCSV;
