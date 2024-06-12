import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
  sort: string;
}

export const StudentApi = createApi({
  reducerPath: "StudentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  tagTypes: ["readStudents", "readStudentsById"],

  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/students",
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readStudents"],
    }),

    updateStudent: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/students/${data.id}`,
          method: "PATCH",
          body: data.body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readStudents", "readStudentsById"],
    }),

    readStudents: builder.query({
      query: (query: IQuery) => {
        const { page, limit, findQuery, sort } = query;
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/students?page=${page}&limit=${limit}&query=${encodeURIComponent(
            findQuery
          )}&sort=${sort}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readStudents"],
    }),

    readStudentById: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/students/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readStudents"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/students/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readStudents"],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useReadStudentsQuery,
  useReadStudentByIdQuery,
  useDeleteStudentMutation,
} = StudentApi;
