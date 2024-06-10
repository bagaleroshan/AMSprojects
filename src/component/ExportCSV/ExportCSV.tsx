import { CSVLink } from "react-csv";

const ExportCSV = ({ data, fileName }) => {
  const columns = [
    { label: "Id", key: "_id" },
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
