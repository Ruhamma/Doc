import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocsData, Section, FormValues } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
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
});

export const {
  useGetDocsQuery,
  useGetDocByIdQuery,
  // useEditSubSectionMutation,
  useGetSubByIdQuery,
  //useCreateDocsMutation,
} = api;
