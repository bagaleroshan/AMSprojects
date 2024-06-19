import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TeacherApi = createApi({
  reducerPath: "TeacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    readGroupsByTeacherId: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/groups/teacher",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useReadGroupsByTeacherIdQuery } = TeacherApi;
