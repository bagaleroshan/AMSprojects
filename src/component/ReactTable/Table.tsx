import React, { useEffect, useMemo, useState } from "react";
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
import ReactPaginate from "react-paginate";

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
    data: dataReadSubjects,
    error: errorReadSubjects,
  } = useReadSubjectsQuery(query);

  useEffect(() => {
    if (isErrorReadSubjects) {
      console.log("****", errorReadSubjects?.error);
    }
  }, [isErrorReadSubjects, errorReadSubjects?.error]);

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
    },
    useGlobalFilter,
    usePagination,
    useRowSelect
  ) as TableInstanceWithPaginationAndGlobalFilter<IData>;

  const { pageIndex } = state;
  const selectedRowsCount = selectedFlatRows.length;

  const handlePageClick = ({ selected }: { selected: number }) => {
    gotoPage(selected);
  };

  const next = () => {
    return (
      <button
        onClick={() =>
          setQuery((prevQuery) => ({
            ...prevQuery,
            page: prevQuery.page + 1,
          }))
        }
        disabled={query.page === dataReadSubjects?.result.totalPages}
      >
        Next
      </button>
    );
  };
  const previous = () => {
    return (
      <button
        onClick={() =>
          setQuery((prevQuery) => ({
            ...prevQuery,
            page: prevQuery.page - 1,
          }))
        }
        disabled={query.page === 1}
      >
        Previous
      </button>
    );
  };
  const CountPage: number = Math.ceil(
    dataReadSubjects?.result.totalDataInWholePage / query.limit
  );
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
        page:{query.page}
        totalPage:{dataReadSubjects?.result.totalPages}
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
        <ReactPaginate
          className="pagination-buttons"
          previousLabel={previous()}
          nextLabel={next()}
          breakLabel={"..."}
          pageCount={CountPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          forcePage={query.page - 1}
        />
      </div>
    </>
  );
};

export default Tables;
