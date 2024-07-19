export interface Node {
  id: string;
  title: string;
  subtitles: Node[];
}

export interface SidebarProps {
  onNodeClick: (node: Node) => void;
}

export interface TreeNodeProps {
  node: Node;
  onAddSubtitle: (parentId: string) => void;
  onNodeClick: (node: Node) => void;
}
