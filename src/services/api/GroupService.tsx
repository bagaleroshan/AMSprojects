import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
  sort: string;
}

export const GroupApi = createApi({
  reducerPath: "GroupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readGroups", "readGroupsById"],

  endpoints: (builder) => ({
    readSubject: builder.query({
      query: (query: IQuery) => {
        return {
          url: `/groups?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
        };
      },
      providesTags: ["readGroups"],
    }),
    createStudent: builder.mutation({
      query: (body) => {
        return {
          url: "/students",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["readGroups"],
    }),
    updateGroup: builder.mutation({
      query: (data) => {
        return {
          url: `/groups/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: ["readGroups", "readGroupsById"],
    }),
    readGroupById: builder.query({
      query: (id) => {
        return {
          url: `/groups/${id}`,
          method: "GET",
        };
      },
      providesTags: ["readGroups"],
    }),
    deleteGroup: builder.mutation({
      query: (id) => {
        return {
          url: `/groups/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["readGroups"],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateStudentMutation,
  useUpdateGroupMutation,
  useReadGroupByIdQuery,
  useDeleteGroupMutation,
  useReadSubjectQuery,
} = GroupApi;
