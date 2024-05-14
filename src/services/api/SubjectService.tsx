import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readSubjects"],

  endpoints: (builder) => ({
    createSubject: builder.mutation({
      query: (body) => {
        return {
          url: "/subjects",
          method: "POST",
          body: body,
        };
      },
      // invalidatesTags: ["readSubjects"],
    }),

    readSubjects: builder.query({
      query: () => {
        return {
          url: "/subjects",
          method: "GET",
        };
      },
      providesTags: ["readSubjects"],
    }),

    readSubjectById: builder.query({
      query: (id) => {
        return {
          url: `/subjects/${id}`,
          method: "GET",
        };
      },
      providesTags: ["readSubjects"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => {
        return {
          url: `/subjects/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["readSubjects"],
    }),
  }),
});

// export const {
//   useCreateSubjectMutation,
//   useReadSubjectsQuery,
//   useReadSubjectByIdQuery,
//   useDeleteSubjectMutation,
// } = SubjectApi;
// export const { useCreateSubjectMutation } = SubjectApi;
