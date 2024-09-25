export interface NewTopicBody {
  name: string;
  content?: string;
}

export interface NewSubTopicBody {
  name: string;
  content: string;
  parentCategoryId: string;
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

export interface Tree {
  id: string;
  name: string;
  subcategories?: Tree[];
}

export interface UpdateDoc {
  id: string;
  name: string;
  content: string;
}
export type TopicsResponse = Topic[];

export interface SingleTopic {
  id: string;
  name: string;
  content: string;
  parentId: string;
}

export interface NotificationType {
  type: "error" | "info";
  message: string;
}
