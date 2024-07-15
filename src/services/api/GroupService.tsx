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
    readGroup: builder.query({
      query: (query: IQuery) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readGroups"],
    }),
    readActiveGroup: builder.query({
      query: (ActiveQuery: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups?active=${ActiveQuery}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readGroups"],
    }),
    createGroup: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/groups",
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readGroups"],
    }),
    updateGroup: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups/${data.id}`,
          method: "PATCH",
          body: data.body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readGroups", "readGroupsById"],
    }),
    readGroupById: builder.query({
      query: (id) => {
        // console.log("id", id);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readGroups"],
    }),
    deleteGroup: builder.mutation({
      query: (id) => {
        console.log(id)
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/groups/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readGroups"],
    }),
  }),
});
// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useReadGroupByIdQuery,
  useDeleteGroupMutation,
  useReadGroupQuery,
  useReadActiveGroupQuery,
} = GroupApi;
