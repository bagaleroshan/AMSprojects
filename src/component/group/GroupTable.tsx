import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent, { IData } from "../TableComponent/TableComponent";
import {
  useDeleteGroupMutation,
  useReadGroupQuery,
} from "../../services/api/GroupService";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const GroupTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Group Name", accessor: "groupName" , width:'30%'},
    { Header: "Subject Name", accessor: "subjectName", width:'30%'},
    { Header: "Teacher Name", accessor: "teacherName", width:'20%'},
    { Header: "Status", accessor: "status", width:'10%' },
  ];

  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data, isLoading, isError, refetch } = useReadGroupQuery({
    ...query,
    sort: query.sort.join(","),
  });
  const [deleteGroups] = useDeleteGroupMutation();

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.result) {
    return <div>Error loading data.</div>;
  }

  const handleGroupEditClick = (selectedRowData: IData[]) => {
    navigate(`/admin/groups/update/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  const handleDeleteClick = (selectedRowData: IData[]) => {
    selectedRowData.forEach((value: IData) => {
      deleteGroups(value.id);
    });
  };
  const handleViewClick = (selectedRowData: IData[]) => {
    navigate(`/admin/groups/${selectedRowData[0].id}`, {
      replace: true,
    });
  };

  return (
    <div>
      <TableComponent
        columns={columns}
        data={data.result.results}
        query={query}
        setQuery={setQuery}
        currentSort={query.sort}
        totalData={data.result.totalDataInWholePage}
        onEditClick={handleGroupEditClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default GroupTable;
