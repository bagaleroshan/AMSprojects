import { useTable } from "react-table";
import "./attendance.css";

const AttendanceTableComponent = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data });
  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // <table {...getTableProps()} style={{ border: '1px solid black', width: '100%', marginTop: '20px' }}>
    //   <thead>
    //     {headerGroups.map(headerGroup => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map(column => (
    //           <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '5px' }}>
    //             {column.render('Header')}
    //           </th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows.map(row => {
    //       prepareRow(row);
    //       return (
    //         <tr {...row.getRowProps()}>
    //           {row.cells.map(cell => (
    //             <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '5px' }}>
    //               {cell.render('Cell')}
    //             </td>
    //           ))}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
    <>
      <div className="outer-div">
        <div className="inner-div">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AttendanceTableComponent;
