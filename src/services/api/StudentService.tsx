import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/* interface Subject {
  subjectName: string;
  subjectCode: string;
  numberOfClasses: number;
  <Subject, Partial<Subject>>
} */

export interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
  sort: string;
}

export const StudentsApi = createApi({
  reducerPath: "StudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readStudents", "readStudentsById"],
  endpoints: (builder) => ({
    readStudents: builder.query({
      query: (query: IQuery) => {
        const { page, limit, findQuery, sort } = query;

        return {
          url: `/students?page=${page}&limit=${limit}&query=${encodeURIComponent(
            findQuery
          )}&sort=${sort}`,
          method: "GET",
        };
      },
      providesTags: ["readStudents"],
    }),
  }),
});

export const { useReadStudentsQuery } = StudentsApi;
