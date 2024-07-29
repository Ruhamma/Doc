import React, { useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import { Topic } from "@/types/topic";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface TreeNodeProps {
  node: Topic;
  onNodeClick: (node: Topic) => void;
  onDeleteNode: (nodeId: string) => void;
}

const TreeNode = ({ node, onNodeClick }: TreeNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  function onDeleteNode(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className="ml-4 mt-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <Button
          variant="subtle"
          color="green"
          onClick={() => onNodeClick(node)}
        >
          {node.name}
        </Button>
        {isHovered && (
          <ActionIcon
            variant="subtle"
            color="green"
            className="absolute "
            onClick={() => onDeleteNode(node.id)}
          >
            <IconPlus size={16} stroke={1.5} />
          </ActionIcon>
        )}
      </div>
      <div>
        {node.subTopics?.map((subTopic) => (
          <TreeNode
            key={subTopic.id}
            node={subTopic}
            onNodeClick={onNodeClick}
            onDeleteNode={onDeleteNode}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeNode;
