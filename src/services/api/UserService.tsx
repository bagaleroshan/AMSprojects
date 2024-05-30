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
          body,
        };
      },
    }),

    userLogin: builder.mutation({
      query: (body) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),

    updatePassword: builder.mutation({
      query: (body) => {
        return {
          url: "/users/update-password",
          method: "PATCH",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/users/forgot-password",
          method: "POST",
          body,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/users/reset-password`,
          method: "PATCH",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),

    myProfile: builder.query({
      query: () => {
        return {
          url: `/users/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: "/users/update-profile",
          method: "PATCH",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUserLoginMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useMyProfileQuery,
  useUpdateProfileMutation,
} = UserApi;
