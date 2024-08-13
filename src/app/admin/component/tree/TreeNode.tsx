import React, { useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import { Topic } from "@/types/topic";
import { IconPlus } from "@tabler/icons-react";

interface TreeNodeProps {
  node: Topic;
  onNodeClick: (node: Topic) => void;
  onAddSubTopicClick: (parentId: string) => void; // Update prop name
}

export const TreeNode = ({
  node,
  onNodeClick,
  onAddSubTopicClick,
}: TreeNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="ml-4 mt-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div items-center>
        <Button
          className="truncate max-w-[calc(100%-32px)] text-left"
          variant="subtle"
          color="gray"
          onClick={() => onNodeClick(node)}
        >
          {node.name}
        </Button>
        {isHovered && (
          <ActionIcon
            key={node.id}
            variant="subtle"
            color="green"
            className="absolute right-0 top-0"
            onClick={() => onAddSubTopicClick(node.id)}
          >
            <IconPlus size={16} stroke={1.5} />
          </ActionIcon>
        )}
      </div>

      <div className="ml-4">
        {node.subcategories?.map((subTopic) => (
          <TreeNode
            key={subTopic.id}
            node={subTopic}
            onNodeClick={onNodeClick}
            onAddSubTopicClick={onAddSubTopicClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeNode;
