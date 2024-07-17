export interface Document {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  exampleCode?: string;
  parentId?: string | null;
}
