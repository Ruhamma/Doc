export interface NewTopicBody {
  name: string;
}

export interface NewSubtopicBody {
  name: string;
  parentCategoryId: string;
}

export interface UpdateDoc {
  name: string;
  content: string;
}

export interface SubTopic {
  id: string;
  name: string;
  content: string;
  url: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  name: string;
  content: string;
  parentId: string | null;
  subTopics?: Topic[];
}

export interface UpdateDoc {
  id: string;
  content: string;
}
export type TopicsResponse = Topic[];
