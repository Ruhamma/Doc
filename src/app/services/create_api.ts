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
    baseUrl: "https://nest-docs-2.onrender.com",
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
    deleteTopic: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
    login: builder.mutation<
      { access_token: string },
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
} = createDocApi;
