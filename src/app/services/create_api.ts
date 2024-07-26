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
    createNewSubtopic: builder.mutation<Topic, NewSubtopicBody>({
      query: (newSubTopic: NewSubtopicBody) => ({
        url: `/categories/subcategories`,
        method: "POST",
        body: newSubTopic,
      }),
    }),
    updateDoc: builder.mutation<Topic, UpdateDoc>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "PUT",
      }),
    }),
    getTopics: builder.query<Topic[], void>({
      query: (topics) => ({
        url: `/categories`,
        method: "GET",
        body: topics,
      }),
    }),
    deleteTopic: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateTopicMutation,
  useCreateNewSubtopicMutation,
  useUpdateDocMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
} = createDocApi;
