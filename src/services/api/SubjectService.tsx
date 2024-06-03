import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readSubjects", "readSubjectsById"],

  endpoints: (builder) => ({
    readSubjects: builder.query({
      query: (query: { page: 1; limit: 10; findQuery: "" }) => {
        return {
          url: `/subjects?page=${query.page}&limit=${query.limit}&query=${query.findQuery}`,
          method: "GET",
        };
      },
      //tag2. provideTag
      providesTags: ["readSubjects"],
    }),

    createSubject: builder.mutation({
      query: (body) => {
        return {
          url: "/subjects",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["readSubjects"],
    }),
    updateSubject: builder.mutation({
      query: (data) => {
        return {
          url: `/subjects/${data.id}`,
          method: "PATCH",
          body: data.body,
        };
      },
      invalidatesTags: ["readSubjects", "readSubjectsById"],
    }),

    // readSubjects: builder.query({
    //   query: () => {
    //     return {
    //       url: "/subjects",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["readSubjects"],
    // }),

    readSubjectById: builder.query({
      query: (id) => {
        return {
          url: `/subjects/${id}`,
          method: "GET",
        };
      },
      providesTags: ["readSubjects"],
    }),

    // deleteSubject: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/subjects/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["readSubjects"],
    // }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useReadSubjectByIdQuery,
} = SubjectApi;
