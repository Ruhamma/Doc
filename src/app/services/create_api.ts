import {
  NewSubtopicBody,
  NewTopicBody,
  Topic,
  TopicsResponse,
  UpdateDoc,
} from "@/types/topic";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createDocApi = createApi({
  reducerPath: "CreatedocApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pis-employee-backend.onrender.com/api/v1",
  }),
  tagTypes: ["doc"],
  endpoints: (builder) => ({
    createTopic: builder.mutation<Topic, NewTopicBody>({
      query: (newTopic: NewTopicBody) => ({
        url: `/categories`,
        method: "POST",
        body: newTopic,
      }),
    }),

    updateDoc: builder.mutation<Topic, UpdateDoc>({
      query: (updateDoc: UpdateDoc) => ({
        url: `/categories/${updateDoc.id}`,
        method: "PUT",
        body: { content: updateDoc.content },
      }),
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
    }),
    getSubCategoryById: builder.query({
      query: (id) => `/categories/content/${id}`, // Fetch a single document by ID
    }),
    deleteTopic: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
    login: builder.mutation<
      { token: string },
      { userName: string; password: string }
    >({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const {
  useCreateTopicMutation,
  useUpdateDocMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
  useLoginMutation,
  useGetSubCategoryByIdQuery
} = createDocApi;
