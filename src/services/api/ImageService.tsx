import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const ImageService = createApi({
  reducerPath: "ImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    uploadProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/files/single`,
          method: "POST",
          body: body,
        };
      },
    }),
    deleteFile: builder.mutation({
      query: (fileUrl) => {
        return {
          url: `/deleteImage/${fileUrl}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useUploadProfileMutation, useDeleteFileMutation } = ImageService;
