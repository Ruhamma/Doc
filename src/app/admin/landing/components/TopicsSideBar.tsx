import React from "react";

import { Topic } from "@/types/topic";
import { generateTopicTree } from "./generateTopic";
import TreeNode from "./TreeNode";

interface TopicsSideBarProps {
  topics: Topic[];
  onNodeClick: (node: Topic) => void;
}

const TopicsSideBar = ({ topics, onNodeClick }: TopicsSideBarProps) => {
  const treeContent = generateTopicTree(
    topics.filter((d) => !d.parentId),
    topics
  );

  return (
    <div className="sidebar p-6">
      {treeContent.map((node) => (
        <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
      ))}
    </div>
  );
};

export default TopicsSideBar;
