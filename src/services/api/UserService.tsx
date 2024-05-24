import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => {
        return {
          url: "/users",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useCreateUserMutation } = UserApi;
