import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AttendanceApi = createApi({
  reducerPath: "AttendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    takeAttendance: builder.mutation({
      query: ({ id, data }) => {
        // console.log(id,data)
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/attendances/${id}`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    readAllAttendance: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/attendances?groupId=${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const { useTakeAttendanceMutation, useReadAllAttendanceQuery } =
  AttendanceApi;
