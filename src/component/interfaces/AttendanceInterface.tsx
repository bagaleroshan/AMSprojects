export interface IAttendance {
    date: string;
    attendance: {
        student:string,
        present:string
    };
}