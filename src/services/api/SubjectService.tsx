import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IQuery {
  page: number;
  limit: number;
  findQuery: string;
  sort:string
}
export const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["readSubjects", "readSubjectsById"],

  endpoints: (builder) => ({
    readSubjects: builder.query({
      query: (query: IQuery) => {
        return {
          url: `/subjects?page=${query.page}&limit=${query.limit}&query=${query.findQuery}&sort=${query.sort}`,
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
  }),
});

export const {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useReadSubjectsQuery,
} = SubjectApi;


    // readSubjectById: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/subjects/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["readSubjects"],
    // }),

    // deleteSubject: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/subjects/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["readSubjects"],
    // }),

// export const {
//   useCreateSubjectMutation,
//   useReadSubjectsQuery,
//   useReadSubjectByIdQuery,
//   useDeleteSubjectMutation,
// } = SubjectApi;
