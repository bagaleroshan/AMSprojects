import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { usePagination, useSortBy, useTable } from "react-table";
import {
  IData,
  Query,
  TableComponentProps,
} from "../interfaces/TableInterface";
import { Checkbox } from "../ReactTable/Checkbox";
import "./table.css";

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
  fileName,
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
    debouncedSetQuery({ findQuery: value, page: 1 });
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

    // Clear selected rows and data
    setSelectedRows(new Set());
    setSelectedRowData([]);

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
    // console.log("View action triggered", selectedRowData);
  };

  const renderSortIcon = (accessor: string) => {
    const sortField = currentSort.find((sort) => sort.includes(accessor));
    if (sortField) {
      return sortField.startsWith("-") ? (
        <ArrowDownwardIcon style={{ fontSize: "16px" }} className="sort-icon" />
      ) : (
        <ArrowUpwardIcon style={{ fontSize: "16px" }} className="sort-icon" />
      );
    }
    return <span className="sort-icon-placeholder"></span>;
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
      fileName,
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
    <div className="table-container">
      <Stack
        sx={{
          direction: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack display="flex" direction="row" spacing={2}>
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
        </Stack>
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

      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th
                    style={{
                      width: "120px",
                      position: "sticky",
                      left: 0,
                      zIndex: 20,
                    }}
                  >
                    Select
                  </th>

                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{ width: column.width }}
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
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleRowClick(index)}
                  >
                    <td style={{ width: "120px", textAlign: "center" }}>
                      <Checkbox
                        checked={selectedRows.has(index)}
                        onChange={(e) => e.stopPropagation()} // prevent row click
                      />
                    </td>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{ width: cell.column.width }}
                      >
                        <span className="ellipsis">{cell.render("Cell")}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Box height={15} />
        {data.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box height={60} />
            <Typography variant="h5">{searchTerm} is not available</Typography>
            <Box height={60} />
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
                  handleQueryChange({
                    limit: Number(e.target.value),
                    page: 1,
                  })
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
          </Box>
        ) : (
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
        )}
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
