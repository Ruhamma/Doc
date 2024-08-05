import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocsData, Section, FormValues } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost.localdomain:3000" }),
  endpoints: (builder) => ({
    getDocs: builder.query<DocsData[], void>({
      query: () => "/docs",
      getDocs: builder.query({
        query: () => "/mmm", //change to newData
      }),
      getDocById: builder.query({
        query: (id) => `/mmm/${id}`, // Fetch a single document by ID
      }),
      getSubById: builder.query({
        query: (id) => `/mmm/subCategory/${id}`, // Fetch a sub-category by ID
      }),
    }),
  }),
});

export const {
  useGetDocsQuery,

  useGetDocByIdQuery,

  useGetSubByIdQuery,
} = api;
