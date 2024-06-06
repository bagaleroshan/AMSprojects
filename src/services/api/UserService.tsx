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
    readUserById: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
    }),
    readAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
    }),
    deleteUserById: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
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
      query: (token) => {
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/users/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/users/update-profile",
          method: "PATCH",
          body,
          headers: {
            Authorization: `Bearer ${token}`,
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
  useReadUserByIdQuery,
  useReadAllUsersQuery,
  useDeleteUserByIdMutation,
  useMyProfileQuery,
  useUpdateProfileMutation,
} = UserApi;
