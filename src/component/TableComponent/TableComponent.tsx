import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { Checkbox } from "../ReactTable/Checkbox";
import "./table.css";

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
      <Stack
        sx={{
          direction: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {selectedRows.size > 0 && (
          <Stack display="flex" direction="row" spacing={0.5}>
            <Button
              variant="contained"
              onClick={handleEditClick}
              startIcon={<EditOutlinedIcon />}
              disabled={
                selectedRowData.length === 0 || selectedRowData.length > 1
              }
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="contained"
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={handleDeleteClick}
              disabled={selectedRowData.length === 0}
            >
              Delete
            </Button>
            <Button
              color="success"
              variant="contained"
              startIcon={<VisibilityOutlinedIcon />}
              onClick={handleViewClick}
              disabled={
                selectedRowData.length === 0 || selectedRowData.length > 1
              }
            >
              View
            </Button>
          </Stack>
        )}
      </Stack>
      <Box height={15} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th style={{ width: "80px" }}>Select</th>
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
        <Box height={15} />

        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <TextField
            sx={{ marginTop: "10px" }}
            size="small"
            id="select"
            value={query.limit}
            onChange={(e) =>
              handleQueryChange({ limit: Number(e.target.value), page: 1 })
            }
            select
          >
            <MenuItem value={10}>Limit 10</MenuItem>
            <MenuItem value={20}>Limit 20</MenuItem>
            <MenuItem value={40}>Limit 40</MenuItem>
            <MenuItem value={1000}>Show All</MenuItem>
          </TextField>

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
        </Stack>
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
