export interface IStudentAttendance {
  studentId: string;
  status: string | number;
}

export interface IAttendance {
  date: string;
  attendance: IStudentAttendance[];
}
