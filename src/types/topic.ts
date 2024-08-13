export interface NewTopicBody {
  name: string;
  content?: string;
}
export interface UpdateDoc {
  name: string;
  content: string;
  parentCategoryId: string;
}

export interface UpdatedTopic {
  id: string;
  name: string;
  content: string;
  parentCategory: {
    id: string;
    name: string;
    content: string | null;
  };
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
  content: string | null;
  parentId?: string;
  subcategories?: Topic[];
}

export interface UpdateDoc {
  id: string;
  content: string;
}
export type TopicsResponse = Topic[];
