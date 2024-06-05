import React, { useState, useCallback, useEffect } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string;
}

const SubjectTable: React.FC = () => {
  const columns = [
    { header: "Subject Name", accessor: "subjectName" },
    { header: "Teacher", accessor: "teacher" },
    { header: "Credits", accessor: "credits" },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: "asc",
  });

  const { data, isLoading, isError, refetch } = useReadSubjectsQuery(query);

  const [searchTerm, setSearchTerm] = useState(query.findQuery);

  const debouncedSetQuery = useCallback(
    debounce((newQuery: Partial<Query>) => {
      setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
    }, 500),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSetQuery({ findQuery: value });
  };

  const handleQueryChange = (newQuery: Partial<Query>) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleQueryChange({ page: query.page + 1 })}>
          Next Page
        </button>
        <button onClick={() => handleQueryChange({ limit: 20 })}>
          Set Limit to 20
        </button>
        <button onClick={() => handleQueryChange({ sort: "desc" })}>
          Sort Descending
        </button>
      </div>
      <TableComponent columns={columns} data={data.result.results} />
      <div>
        <h2>Query State:</h2>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </div>
    </div>
  );
};

// Debounce function to limit the rate of API calls
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default SubjectTable;
