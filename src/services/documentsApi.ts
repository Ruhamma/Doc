import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api-endpoint.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => `/documents`,
      providesTags: ["Document"],
    }),
    getDocument: builder.query<Document, string>({
      query: (id) => `/documents/${id}`,
      providesTags: ["Document"],
    }),
    createDocument: builder.mutation<Document, Partial<Document>>({
      query: (newDocument) => ({
        url: `/documents`,
        method: "POST",
        body: newDocument,
      }),
      invalidatesTags: ["Document"],
    }),
    updateDocument: builder.mutation<
      Document,
      { id: string; data: Partial<Document> }
    >({
      query: ({ id, data }) => ({
        url: `/documents/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApi;
