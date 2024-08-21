import { NewTopicBody, Topic, UpdateDoc, UpdatedTopic } from "@/types/topic";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://nest-docs-2.onrender.com",
  prepareHeaders: (headers) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("authToken");
    // If a token is available, add it to the headers
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      if (result.error.status === 401) {
        console.error("Unauthorized request");
      } else if (result.error.status === 500) {
        console.error("Server error");
      } else {
        console.error("An error occurred:", result.error);
      }
    }
    return result;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

export const createDocApi = createApi({
  reducerPath: "CreatedocApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["doc"],
  endpoints: (builder) => ({
    createTopic: builder.mutation<Topic, NewTopicBody>({
      query: (newTopic: NewTopicBody) => ({
        url: `/categories`,
        method: "POST",
        body: newTopic,
      }),
      invalidatesTags: ["doc"],
    }),

    updateDoc: builder.mutation<Topic, UpdateDoc>({
      query: (updateDoc: UpdateDoc) => ({
        url: `/categories/${updateDoc.id}`,
        method: "PUT",
        body: { content: updateDoc.content },
      }),
      invalidatesTags: ["doc"],
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => ({
        url: `/categories/tree`,
        method: "GET",
      }),
      providesTags: ["doc"],
    }),
    getTopicById: builder.query({
      query: (id) => `/categories/${id}`, // Fetch a single document by ID
    }),
    deleteTopic: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["doc"],
    }),
    login: builder.mutation<
      { access_token: string },
      { username: string; password: string }
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
  useGetTopicByIdQuery
} = createDocApi;
