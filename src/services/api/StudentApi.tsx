import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const StudentApi = createApi({
  reducerPath: "StudentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readStudents", "readStudentsById"],

  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (body) => {
        return {
          url: "/students",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["readStudents"],
    }),
    UpdateStudent: builder.mutation({
      query: (data) => {
        return {
          url: `/students/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: ["readStudents", "readStudentsById"],
    }),

    readStudentById: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
        0;
      },
      providesTags: ["readStudents"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => {
        return {
          url: `/subjects/${id}`,
          method: "DELETE",
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
  useReadStudentByIdQuery,
} = StudentApi;
