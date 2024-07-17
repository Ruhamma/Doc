import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DocsData, Section } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/documentation",
  }),
  endpoints: (builder) => ({
    getDocs: builder.query<DocsData[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetDocsQuery } = api;
