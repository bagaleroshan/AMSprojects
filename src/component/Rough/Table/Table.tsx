import "./table.css";
import { useMemo } from "react";
import { TableColumns } from "./TableColumns";
import {
  useTable,
  // usePagination,
  Column,
  HeaderGroup,
  Row,
  Cell,
} from "react-table";
interface IData {
  id: number;
  name: string;
  code: string;
}
const Table: React.FC = () => {
  const columns: Column[] = useMemo(() => TableColumns, []);

  const data: IData[] = [
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
  ];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // pageOptions,
    // gotoPage,
    // pageCount,
    // setPageSize,
    // state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 0 },
    },
    // usePagination
  );
  // const { pageIndex, pageSize } = state;
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: Column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row, rowIndex:number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell: Cell, cellIndex:number) => {
                  return (
                    <td {...cell.getCellProps()} key={cellIndex}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div>
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
          ></input>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
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
      </div> */}
    </>
  );
};

export default Table;
