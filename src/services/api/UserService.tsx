import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuery } from "./StudentApi";

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
    deleteUsersById: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/users/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    readUserById: builder.query({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/users/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readUsers"],
    }),

    readUsers: builder.query({
      query: (query: IQuery) => {
        return {
          url: `/users?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
        };
      },

      providesTags: ["readUsers"],
    }),

    // readUserById: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/users/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["readUser"],
    // }),
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
  useMyProfileQuery,
  useUpdateProfileMutation,
  useReadUsersQuery,
  useDeleteUsersByIdMutation,
} = UserApi;
