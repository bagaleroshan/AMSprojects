import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "./StudentApi";
export const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readSubjects", "readSubjectsById"],

  endpoints: (builder) => ({
    readSubjects: builder.query({
      query: (query: IQuery) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/subjects?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      //tag2. provideTag
      providesTags: ["readSubjects"],
    }),

    createSubject: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/subjects",
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readSubjects"],
    }),

    updateSubject: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/subjects/${data.id}`,
          method: "PATCH",
          body: data.body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readSubjects", "readSubjectsById"],
    }),

    readSubjectById: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/subjects/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readSubjects"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/subjects/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readSubjects"],
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useReadSubjectByIdQuery,
  useReadSubjectsQuery,
  useDeleteSubjectMutation,
} = SubjectApi;
