import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IQuery {
  page?: number;
  limit?: number;
  findQuery?: string;
  sort?: string;
  role?:string;
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
    readStudentByGroupId: builder.query({
      query: ({ id, query }) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/students?groups=${id}&query=${query.findQuery}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readStudents"],
    }),
    addStudentGroup: builder.mutation({
      query: ({ body, id }) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups/addStudent/${id}`,
          method: "PATCH",
          body: { students: body },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readStudents"],
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
    /* Delete Student from Particular Group */
    removeStudentFromGroup: builder.mutation({
      query: (data) => {
        // console.log("data**************", data);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups/removeStudent/${data.groupId}`,
          method: "PATCH",
          body: { students: data.studentId },
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
  useReadStudentByGroupIdQuery,
  useDeleteStudentMutation,
  useRemoveStudentFromGroupMutation,
  useAddStudentGroupMutation,
} = StudentApi;
