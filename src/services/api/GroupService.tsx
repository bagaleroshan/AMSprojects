import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "./StudentApi";

export const GroupApi = createApi({
  reducerPath: "GroupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readGroups", "readGroupsById"],

  endpoints: (builder) => ({
    readGroups: builder.query({
      query: (query: IQuery) => {
        return {
          url: `/groups?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
        };
      },
      providesTags: ["readGroups"],
    }),
  }),
});
