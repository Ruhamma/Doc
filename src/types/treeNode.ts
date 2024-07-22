export interface Node {
  id: string;
  title: string;
  content?: string;
  subtitles: Node[];
}

export interface TreeNodeProps {
  node: Node;
  onNodeClick: (node: Node) => void;
}

export interface SidebarProps {
  onNodeClick: (node: Node) => void;
}
