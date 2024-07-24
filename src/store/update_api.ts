import { DocsData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost.localdomain:3000" }),
  endpoints: (builder) => ({
    getDocs: builder.query<DocsData[], void>({
      query: () => "/",
    }),
  }),
});
