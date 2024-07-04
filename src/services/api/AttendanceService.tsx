import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AttendanceApi = createApi({
  reducerPath: "AttendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readAllAttendance"],

  endpoints: (builder) => ({
    takeAttendance: builder.mutation({
      query: ({ id, data }) => {
        console.log(id,data,"*******************")
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
      invalidatesTags: ["readAllAttendance"],

    }),
    readAllAttendance: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/attendances/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readAllAttendance"],
    }),
    readAttendanceForGroup: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/attendances?groupId=${id}&limit=0`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    readMonthlyAttendanceReport: builder.query({
      query: ({ id, month }) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          // {{url}}/attendances/monthly-report?groupId=667ba81354acc6871dbcf0cf&month=2024-06
          url: `/attendances/monthly-report?groupId=${id}&month=${month}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getTodayAttendance: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          // {{url}}/attendances/attendance-taken-groups
          url: `/attendances/attendance-taken-groups`,
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
export const {
  useTakeAttendanceMutation,
  useReadAllAttendanceQuery,
  useReadMonthlyAttendanceReportQuery,
<<<<<<< HEAD
  useGetTodayAttendanceQuery,
=======
  useReadAttendanceForGroupQuery,
>>>>>>> 40e9c183c16c544b1522762b1fe20e539b2d4ffe
} = AttendanceApi;
