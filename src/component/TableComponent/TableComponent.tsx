import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { Checkbox } from "../ReactTable/Checkbox";
import "./table.css";
import ExportCSV from "../ExportCSV/ExportCSV";

export interface IData<T = any> {
  [key: string]: T;
}

interface TableComponentProps {
  columns: Column<IData>[];
  data: IData[];
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  currentSort: string[];
  totalData: number;
  onEditClick: (selectedRowData: IData[]) => void;
  onViewClick: (selectedRowData: IData[]) => void;
  onDeleteClick: (selectedRowData: IData[]) => void;
}

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  query,
  setQuery,
  currentSort,
  totalData,
  onEditClick,
  onViewClick,
  onDeleteClick,
}) => {
  const [searchTerm, setSearchTerm] = useState(query.findQuery);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedRowData, setSelectedRowData] = useState<IData[]>([]);

  const debouncedSetQuery = debounce((newQuery: Partial<Query>) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  }, 900);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSetQuery({ findQuery: value });
  };

  const handleQueryChange = (newQuery: Partial<Query>) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };

  const handleRowClick = (rowIndex: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRows.delete(rowIndex);
    } else {
      newSelectedRows.add(rowIndex);
    }
    setSelectedRows(newSelectedRows);

    // Update selected row data
    const rowData = data[rowIndex];
    const newSelectedRowData = [...selectedRowData];
    if (newSelectedRows.has(rowIndex)) {
      newSelectedRowData.push(rowData);
    } else {
      const indexToRemove = newSelectedRowData.findIndex(
        (row) => row === rowData
      );
      if (indexToRemove !== -1) {
        newSelectedRowData.splice(indexToRemove, 1);
      }
    }
    setSelectedRowData(newSelectedRowData);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    handleQueryChange({ page: selectedPage });
  };
  const handleEditClick = () => {
    onEditClick(selectedRowData);
  };

  const handleDeleteClick = () => {
    onDeleteClick(selectedRowData);
    console.log("Delete action triggered", selectedRowData);
    // Clear selected rows state
    setSelectedRows(new Set());
    setSelectedRowData([]);
  };

  const handleViewClick = () => {
    onViewClick(selectedRowData);
    console.log("View action triggered", selectedRowData);
  };

  const renderSortIcon = (accessor: string) => {
    const sortField = currentSort.find((sort) => sort.includes(accessor));
    if (sortField) {
      return sortField.startsWith("-") ? "↓" : "↑";
    }
    return "";
  };

  const handleSort = (accessor: string) => {
    setQuery((prevQuery) => {
      const newSort = [...prevQuery.sort];
      const existingSortIndex = newSort.findIndex((sort) =>
        sort.includes(accessor)
      );

      if (existingSortIndex !== -1) {
        const existingSort = newSort[existingSortIndex];
        if (existingSort.startsWith("-")) {
          newSort.splice(existingSortIndex, 1); // remove sort
        } else {
          newSort[existingSortIndex] = `-${accessor}`; // descending sort
        }
      } else {
        newSort.push(accessor); // ascending sort
      }

      return { ...prevQuery, sort: newSort };
    });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: query.page - 1,
        pageSize: query.limit,
        sortBy: query.sort.map((sortField) => ({
          id: sortField.startsWith("-") ? sortField.substring(1) : sortField,
          desc: sortField.startsWith("-"),
        })),
      },
      manualPagination: true,
      pageCount: Math.ceil(totalData / query.limit),
      manualSortBy: true,
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {selectedRows.size > 0 && (
          <div>
            <button
              onClick={handleEditClick}
              disabled={
                selectedRowData.length === 0 || selectedRowData.length > 1
              }
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={selectedRowData.length === 0}
            >
              Delete
            </button>
            <button
              onClick={handleViewClick}
              disabled={
                selectedRowData.length === 0 || selectedRowData.length > 1
              }
            >
              View
            </button>
          </div>
        )}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>Select</th>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => handleSort(column.id)}
                >
                  {column.render("Header")}
                  {renderSortIcon(column.id)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => handleRowClick(index)}>
                <td>
                  <Checkbox
                    checked={selectedRows.has(index)}
                    onChange={(e) => e.stopPropagation()} // prevent row click
                  />
                </td>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <select
          value={query.limit}
          onChange={(e) =>
            handleQueryChange({ limit: Number(e.target.value), page: 1 })
          }
        >
          <option value={10}>Limit 10</option>
          <option value={20}>Limit 20</option>
          <option value={40}>Limit 40</option>
          <option value={1000}>Show All</option>
        </select>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(totalData / query.limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
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

export default TableComponent;
