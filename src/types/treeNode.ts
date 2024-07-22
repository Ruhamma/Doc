// types/treeNode.ts
export interface Node {
  id: string;
  title: string;
  subtitles: Node[];
  content?: string;
}

export interface TreeNodeProps {
  node: Node;
  onNodeClick: (node: Node) => void;
}

export interface SidebarProps {
  onNodeClick: (node: Node) => void;
}
