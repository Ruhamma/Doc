import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocsData, Section, FormValues } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
    getDocs: builder.query<DocsData[], void>({
      query: () => "/newData",
    }),
    createDocs: builder.mutation<DocsData[], FormValues>({
      query: (initialData) => ({
        url: "/newData",
        method: "POST",
        body: initialData,
      }),
    }),
    editDocs: builder.mutation({
      query: (data) => ({
        url: `/newData/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    editSubSection: builder.mutation<
      void,
      { id: string; title: string; content: string; example: string }
    >({
      query: ({ id, title, content, example }) => ({
        url: `/newData/documents/subSections/${id}`,
        method: "PATCH",
        body: { title, content, example },
      }),
    }),
  }),
});

export const {
  useGetDocsQuery,
  useCreateDocsMutation,
  useEditDocsMutation,
  useEditSubSectionMutation,
} = api;
