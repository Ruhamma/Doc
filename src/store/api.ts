import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocsData, Section, FormValues } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }), 
  endpoints: (builder) => ({
    getDocs: builder.query<DocsData[], void>({
      query: () => "/docs",
    }),
  }),
});

export const {
  useGetDocsQuery,
  useCreateDocsMutation,
  useEditDocsMutation,
  useEditSubSectionMutation,
} = api;
