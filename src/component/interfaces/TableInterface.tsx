import { Column } from "react-table";

export interface IData<T = any> {
  [key: string]: T;
}

export interface TableComponentProps {
  columns: Column<IData>[];
  data: IData[];
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  currentSort: string[];
  totalData: number;
  onEditClick: (selectedRowData: IData[]) => void;
  onViewClick: (selectedRowData: IData[]) => void;
  onDeleteClick: (selectedRowData: IData[]) => void;
  fileName?: string;
}

export interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
  role: string;
}

/* Group Export CSV */

// interface group {
//   startTime?: Date;
//   endTime?: Date;
// }
export interface DataItem {
  id: string;
  groupName: string;
  // group?: group;
  subject: {
    subjectName: string;
  };
  teacher: {
    fullName: string;
  };
}
