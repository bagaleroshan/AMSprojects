import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFeedback } from "../../component/interfaces/FeedbackInterface";

export interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
  sort: string;
}

export const FeedbackApi = createApi({
  reducerPath: "FeedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readFeedbacks", "readFeedbacksById"],

  endpoints: (builder) => ({
    readFeedback: builder.query({
      query: (query: IQuery) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readFeedbacks"],
    }),
    createFeedback: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem("studenttoken");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: "/feedbacks",
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readFeedbacks"],
    }),
    updateFeedback: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks/${data.id}`,
          method: "PATCH",
          body: data.body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readFeedbacks", "readFeedbacksById"],
    }),
    // particular feedback
    readFeedbackById: builder.query({
      query: (id) => {
        // console.log("id", id);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["readFeedbacksById"],
    }),
    // particular group feedback
    readFeedbackByGroupId: builder.query({
      query: (id) => {
        // console.log("group_id", id);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks/group/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteFeedback: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["readFeedbacks"],
    }),

    requestFeedback: builder.mutation<void, IFeedback>({
      query: (groupId) => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token available");
        }
        return {
          url: `/feedbacks/${groupId}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["readFeedbacks"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useReadFeedbackByIdQuery,
  useReadFeedbackByGroupIdQuery,
  useDeleteFeedbackMutation,
  useReadFeedbackQuery,
  useRequestFeedbackMutation,
} = FeedbackApi;
