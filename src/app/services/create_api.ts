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
      query: (id) => ({
        url: `/categories/${id}`,
        method: "PUT",
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
  }),
});
export const {
  useCreateTopicMutation,

  useUpdateDocMutation,
  useGetTopicsQuery,
  useDeleteTopicMutation,
} = createDocApi;
