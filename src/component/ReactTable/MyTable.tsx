import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Cell,
  Column,
  ColumnInstance,
  HeaderGroup,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  UsePaginationState,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";
import { Checkbox } from "./Checkbox";
import "./table.css";

export interface IData<T = any> {
  [key: string]: T;
}
interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
}

interface CustomTableProps {
  columns: Column<IData>[];
  data: IData[];
}

interface CustomTableOptions<D extends object> extends TableOptions<D> {
  manualPagination?: boolean;
}

type TableInstanceWithPaginationAndGlobalFilter<T extends object> =
  TableInstance<T> & {
    state: TableState<T> & UsePaginationState<T> & { globalFilter: string };
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
    pageIndex: number; // Add pageIndex property
    pageSize: number; // Add pageSize property
  };

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [query, setQuery] = useState<IQuery>({
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
      if ("error" in errorReadSubjects) {
        console.log("Error fetching subjects:", errorReadSubjects.error);
      } else {
        console.log("Unknown error occurred while fetching subjects.");
      }
    }
  }, [isErrorReadSubjects, errorReadSubjects]);

  interface CustomRow<T extends object> extends Row<T> {
    isSelected: boolean;
  }
  const tableColumns: Column<IData>[] = useMemo(
    () => [
      {
        Header: "Select",
        Cell: ({ row }: { row: CustomRow<IData> }) => (
          <Checkbox
            checked={row.isSelected}
            onChange={() => handleRowClick(row)}
            indeterminate={false}
          />
        ),
      },
      ...columns,
    ],
    [columns]
  );

  const tableData: IData[] = useMemo(() => {
    return dataReadSubjects?.result?.results || [];
  }, [dataReadSubjects]);

  type RowWithToggleSelect<T extends object> = Row<T> & {
    toggleRowSelected: () => void;
  };

  const handleRowClick = (row: Row<IData>) => {
    const selectedRow = row as RowWithToggleSelect<IData>;
    selectedRow.toggleRowSelected();
    setSelectedRowId(
      row.original.id === selectedRowId ? null : row.original.id
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    selectedFlatRows,
    prepareRow,
  } = useTable<IData>(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0, globalFilter: "" } as Partial<
        TableState<IData>
      >,
      manualPagination: true,
      useRowSelect,
    } as CustomTableOptions<IData>,

    useGlobalFilter,
    usePagination,
    useRowSelect
  ) as TableInstanceWithPaginationAndGlobalFilter<IData>;

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
        value={query.findQuery}
        onChange={(e) => setQuery({ ...query, findQuery: e.target.value })}
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
              {headerGroup.headers.map((column: ColumnInstance<IData>) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
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
        <select
          value={query.limit}
          onChange={(e) =>
            setQuery({ ...query, limit: parseInt(e.target.value) })
          }
        >
          {[10, 15, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
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

export default CustomTable;

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Cell,
//   Column,
//   HeaderGroup,
//   Row,
//   TableInstance,
//   TableState,
//   UsePaginationState,
//   useGlobalFilter,
//   usePagination,
//   useRowSelect,
//   useTable,
//   ColumnInstance,
// } from "react-table";
// import { useReadSubjectsQuery } from "../../services/api/SubjectService";
// import { TableColumns } from "./TableColumn";
// import "./table.css";
// import { TableOptions } from "react-table";
// import ReactPaginate from "react-paginate";
// import { Checkbox } from "./Checkbox";

// interface IData {
//   id: number;
//   name: string;
//   code: string;
// }

// interface IQuery {
//   page: number;
//   limit: number;
//   findQuery: string;
// }

// interface CustomTableOptions<D extends object> extends TableOptions<D> {
//   manualPagination?: boolean;
// }

// type TableInstanceWithPaginationAndGlobalFilter<T extends object> =
//   TableInstance<T> & {
//     state: TableState<T> & UsePaginationState<T> & { globalFilter: string };
//     page: Row<T>[];
//     nextPage: () => void;
//     previousPage: () => void;
//     canNextPage: boolean;
//     canPreviousPage: boolean;
//     pageOptions: number[];
//     gotoPage: (pageIndex: number) => void;
//     pageCount: number;
//     setPageSize: (pageSize: number) => void;
//     setGlobalFilter: (filterValue: unknown) => void;
//     selectedFlatRows: Row<T>[];
//     pageIndex: number; // Add pageIndex property
//     pageSize: number; // Add pageSize property
//   };

// const Tables: React.FC = () => {
//   const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
//   const [query, setQuery] = useState<IQuery>({
//     page: 1,
//     limit: 10,
//     findQuery: "",
//   });

//   const {
//     isError: isErrorReadSubjects,
//     data: dataReadSubjects,
//     error: errorReadSubjects,
//   } = useReadSubjectsQuery(query);

//   useEffect(() => {
//     if (isErrorReadSubjects) {
//       if ("error" in errorReadSubjects) {
//         console.log("Error fetching subjects:", errorReadSubjects.error);
//       } else {
//         console.log("Unknown error occurred while fetching subjects.");
//       }
//     }
//   }, [isErrorReadSubjects, errorReadSubjects]);

//   interface CustomRow<T extends object> extends Row<T> {
//     isSelected: boolean;
//   }
//   const columns: Column<IData>[] = useMemo(
//     () => [
//       {
//         Header: "Select",
//         Cell: ({ row }: { row: CustomRow<IData> }) => (
//           <Checkbox
//             checked={row.isSelected}
//             onChange={() => handleRowClick(row)}
//             indeterminate={false}
//           />
//         ),
//       },
//       ...TableColumns, // Assuming TableColumns define other columns
//     ],
//     [TableColumns]
//   );

//   const data: IData[] = useMemo(() => {
//     return dataReadSubjects?.result?.results || [];
//   }, [dataReadSubjects]);

//   type RowWithToggleSelect<T extends object> = Row<T> & {
//     toggleRowSelected: () => void;
//   };

//   const handleRowClick = (row: Row<IData>) => {
//     // Assert the type of row to RowWithToggleSelect<IData>
//     const selectedRow = row as RowWithToggleSelect<IData>;
//     selectedRow.toggleRowSelected();
//     setSelectedRowId(
//       row.original.id === selectedRowId ? null : row.original.id
//     );
//   };
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     gotoPage,
//     selectedFlatRows,
//     prepareRow,
//   } = useTable<IData>(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, globalFilter: "" } as Partial<
//         TableState<IData>
//       >,
//       manualPagination: true,
//       useRowSelect,
//     } as CustomTableOptions<IData>,

//     useGlobalFilter,
//     usePagination,
//     useRowSelect
//   ) as TableInstanceWithPaginationAndGlobalFilter<IData>;
//   const selectedRowsCount = selectedFlatRows.length;
//   const handlePageClick = ({ selected }: { selected: number }) => {
//     gotoPage(selected);
//   };
//   const next = () => {
//     return (
//       <button
//         onClick={() =>
//           setQuery((prevQuery) => ({
//             ...prevQuery,
//             page: prevQuery.page + 1,
//           }))
//         }
//         disabled={query.page === dataReadSubjects?.result.totalPages}
//       >
//         Next
//       </button>
//     );
//   };
//   const previous = () => {
//     return (
//       <button
//         onClick={() =>
//           setQuery((prevQuery) => ({
//             ...prevQuery,
//             page: prevQuery.page - 1,
//           }))
//         }
//         disabled={query.page === 1}
//       >
//         Previous
//       </button>
//     );
//   };
//   const CountPage: number = Math.ceil(
//     dataReadSubjects?.result.totalDataInWholePage / query.limit
//   );

//   return (
//     <>
//       <input
//         value={query.findQuery}
//         onChange={(e) => setQuery({ ...query, findQuery: e.target.value })}
//         placeholder="Search..."
//       />
//       {selectedRowsCount === 1 && (
//         <>
//           <button onClick={() => console.log("edit button clicked")}>
//             <i className="fas fa-edit"></i> Edit
//           </button>
//           <button onClick={() => console.log("delete button clicked")}>
//             <i className="fas fa-trash-alt"></i> Delete
//           </button>
//         </>
//       )}
//       {selectedRowsCount > 1 && (
//         <button onClick={() => console.log("delete button clicked")}>
//           <i className="fas fa-trash-alt"></i> Delete
//         </button>
//       )}
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup: HeaderGroup<IData>) => (
//             <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//               {headerGroup.headers.map((column: ColumnInstance<IData>) => (
//                 <th {...column.getHeaderProps()} key={column.id}>
//                   {column.render("Header")}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row: Row<IData>) => {
//             prepareRow(row);
//             return (
//               <tr
//                 {...row.getRowProps()}
//                 key={row.id}
//                 onClick={() => handleRowClick(row)}
//                 style={{
//                   backgroundColor:
//                     selectedRowId === row.original.id ? "#F2F2F2" : "",
//                   cursor: "pointer",
//                 }}
//               >
//                 {row.cells.map((cell: Cell<IData>) => (
//                   <td {...cell.getCellProps()} key={cell.column.id}>
//                     {cell.render("Cell")}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div>
//         Page: {query.page}
//         Total Pages: {dataReadSubjects?.result?.totalPages}
//         <select
//           value={query.limit}
//           onChange={(e) =>
//             setQuery({ ...query, limit: parseInt(e.target.value) })
//           }
//         >
//           {[10, 15, 50].map((size) => (
//             <option key={size} value={size}>
//               Show {size}
//             </option>
//           ))}
//         </select>
//         <ReactPaginate
//           className="pagination-buttons"
//           previousLabel={previous()}
//           nextLabel={next()}
//           breakLabel={"..."}
//           pageCount={CountPage}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//           forcePage={query.page - 1}
//         />
//       </div>
//     </>
//   );
// };

// export default Tables;
