import { useMemo, useState } from "react";
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
import "./table.css";
import { TableColumns } from "./TableColumns";
import { Checkbox } from "./Checkbox";
interface IData {
  id: number;
  name: string;
  code: string;
}
type TableInstanceWithGlobalFilter<T extends object> = TableState<T> & {
  globalFilter: string;
};
type TableInstanceWithSelection<T extends object> = TableInstance<T> & {
  toggleAllRowsSelected: (checked: boolean) => void;
  getToggleAllRowsSelectedProps: () => {
    onChange: () => void;
    checked: boolean;
    indeterminate: boolean;
  };
};

type TableInstanceWithPaginationAndGlobalFilter<T extends object> =
  TableInstanceWithSelection<T> & {
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
  const columns: Column<IData>[] = useMemo(
    () => TableColumns as Column<IData>[],
    []
  );
  const data: IData[] = useMemo(
    () => [
      {
        id: 1,
        name: "JAVASCRIPT",
        code: "JS",
      },
      {
        id: 2,
        name: "JAVA",
        code: "J",
      },
      {
        id: 21,
        name: "PYTHON",
        code: "PY",
      },
      {
        id: 22,
        name: "C",
        code: "c",
      },
    ],
    []
  );
  const [editButtonVisible, setEditButtonVisible] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
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
      stateReducer: (newState, action) => {
        if (action.type === "toggleRowSelected") {
          setEditButtonVisible(Object.keys(newState.selectedRowIds).length > 0);
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
  const { pageIndex, pageSize, globalFilter } = state;
  return (
    <>
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search..."
      />
      {/* <button>add</button> */}
      {editButtonVisible && (
        <button onClick={() => console.log("edit button clicked")}>edit</button>
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
          {page.map((row: Row<IData>, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
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
        <span>
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
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>

      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};
export default Tables;
