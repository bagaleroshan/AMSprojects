import { useEffect, useMemo, useState } from "react";
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableInstance,
  TableState,
  UsePaginationState,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { Checkbox } from "./Checkbox";
import { TableColumns } from "./TableColumn";
import "./table.css";
import { current } from "@reduxjs/toolkit";

interface IData {
  id: number;
  name: string;
  code: string;
}
type TableInstanceWithGlobalFilter<T extends object> = TableState<T> & {
  globalFilter: string;
};
type TableInstanceWithPaginationAndGlobalFilter<T extends object> =
  TableInstance<T> & {
    state: TableInstanceWithGlobalFilter<T> & UsePaginationState<T>;
    page: Row<T>[];
    nextPage: () => void;
    previousPage: () => void;
    canNextPage: boolean;
    canPreviousPage: boolean;
    pageOptions: number[];
    gotoPage: (pageIndex: number) => void;
    pageCount: number;
    setPageSize: (pageSize: number) => void;
    setGlobalFilter: (filterValue: unknown) => void;
    selectedFlatRows: Row<T>[];
  };
const Tables: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    findQuery: "",
  });
  const {
    isError: isErrorReadSubjects,
    // isSuccess: isSuccessReadSubjects,
    // isLoading: isLoadingReadSubjects,
    data: dataReadSubjects,
    error: errorReadSubjects,
  } = useReadSubjectsQuery(query);
  useEffect(() => {
    if (isErrorReadSubjects) {
      console.log("****", errorReadSubjects?.error);
    }
  }, [isErrorReadSubjects, errorReadSubjects?.error]);
  // console.log(dataReadSubjects?.result, "***********111");
  // let page=dataReadSubjects?.result
  const columns: Column<IData>[] = useMemo(
    () => TableColumns as Column<IData>[],
    []
  );
  const data: IData[] = useMemo(() => {
    if (dataReadSubjects?.result) {
      return dataReadSubjects?.result.results;
    } else {
      return [];
    }
  }, [JSON.stringify(dataReadSubjects)]);

  console.log("*******", data);
  const handleRowClick = (row: Row<IData>) => {
    row.toggleRowSelected();
    setSelectedRowId(
      row.original.id === selectedRowId ? null : row.original.id
    );
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    // previousPage,
    // canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    selectedFlatRows,
    prepareRow,
  } = useTable<IData>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, globalFilter: "" } as Partial<
        TableState<IData>
      >,
      manualPagination: true,
      manualSortBy: true,
      manualFilters: true,
      autoResetSortBy: false,
      stateReducer: (newState, action) => {
        if (
          action.type === "toggleRowSelected" ||
          action.type === "toggleAllRowsSelected"
        ) {
          // No need to manage a separate state for button visibility
        }
        return newState;
      },
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  ) as TableInstanceWithPaginationAndGlobalFilter<IData>;

  const { pageIndex } = state;
  const selectedRowsCount = selectedFlatRows.length;

  console.log("page is ", page);
  return (
    <>
      <input
        value={query.findQuery || ""}
        onChange={(e) => {
          setQuery({
            ...query,
            findQuery: e.target.value,
          });
        }}
        placeholder="Search..."
      />
      {selectedRowsCount === 1 && (
        <>
          <button onClick={() => console.log("edit button clicked")}>
            <i className="fas fa-edit"></i> Edit
          </button>
          <button onClick={() => console.log("delete button clicked")}>
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </>
      )}
      {selectedRowsCount > 1 && (
        <button onClick={() => console.log("delete button clicked")}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<IData>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(
                (column: HeaderGroup<IData>["headers"][number]) => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render("Header")}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<IData>) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                onClick={() => handleRowClick(row)}
                style={{
                  backgroundColor:
                    selectedRowId === row.original.id ? "#F2F2F2" : "",
                  cursor: "pointer",
                }}
              >
                {row.cells.map((cell: Cell<IData>) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span> */}
        <select
          value={query.limit}
          onChange={(e) => {
            setQuery((prevQuery) => ({
              ...prevQuery,
              limit: parseInt(e.target.value),
            }));
          }}
        >
          {[...new Set([10, 15, 50])].map((size) => (
            <option key={size} value={size}>
              show {size}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          onClick={() =>
            setQuery((prevQuery) => ({
              ...prevQuery,
              page: prevQuery.page - 1,
            }))
          }
        >
          Previous
        </button>

        <button
          onClick={() =>
            setQuery((prevQuery) => ({
              ...prevQuery,
              page: prevQuery.page + 1,
            }))
          }
        >
          Next
        </button>

        <button onClick={() => gotoPage(pageCount - 1)}>{">>"}</button>
      </div>
    </>
  );
};
export default Tables;
