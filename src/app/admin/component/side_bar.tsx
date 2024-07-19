import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { nanoid } from "nanoid";
import { SidebarProps, TreeNodeProps } from "@/types/treeNode";

// Recursive component for rendering titles and subtitles
const TreeNode = ({ node, onAddSubtitle, onNodeClick }: TreeNodeProps) => (
  <div className="ml-4 mt-2">
    <div>
      <Button variant="subtle" onClick={() => onNodeClick(node)}>
        {node.title}
      </Button>
      <Button
        size="xs"
        variant="outline"
        onClick={() => onAddSubtitle(node.id)}
      >
        Add Subtitle
      </Button>
    </div>
    <div>
      {node.subtitles.map((subtitle) => (
        <TreeNode
          key={subtitle.id}
          node={subtitle}
          onAddSubtitle={onAddSubtitle}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  </div>
);

const Sidebar = ({ onNodeClick }: SidebarProps) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: nanoid(), title: "Title 1", subtitles: [] },
  ]);

  const handleAddTitle = () => {
    setNodes([
      ...nodes,
      { id: nanoid(), title: `Title ${nodes.length + 1}`, subtitles: [] },
    ]);
  };

  const handleAddSubtitle = (parentId: string) => {
    const addSubtitleRecursively = (nodes: Node[]): Node[] => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          const newSubtitle: Node = {
            id: nanoid(),
            title: `Subtitle ${node.subtitles.length + 1}`,
            subtitles: [],
          };
          return { ...node, subtitles: [...node.subtitles, newSubtitle] };
        }
        return { ...node, subtitles: addSubtitleRecursively(node.subtitles) };
      });
    };

    setNodes(addSubtitleRecursively(nodes));
  };

  return (
    <div className="sidebar p-6 px-10 text-dark border-r border-gray-300 min-h-[100vh]">
      <Group direction="column" grow>
        <Button onClick={handleAddTitle}>Add Title</Button>
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onAddSubtitle={handleAddSubtitle}
            onNodeClick={onNodeClick}
          />
        ))}
      </Group>
    </div>
  );
};

export default Sidebar;
