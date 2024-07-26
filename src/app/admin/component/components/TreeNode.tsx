import React from "react";
import { Button } from "@mantine/core";
import { Topic } from "@/types/topic";

interface TreeNodeProps {
	node: Topic;
	onNodeClick: (node: Topic) => void;
}

const TreeNode = ({ node, onNodeClick }: TreeNodeProps) => (
	<div className="ml-4 mt-2">
		<div>
			<Button
				variant="subtle"
				color="green"
				onClick={() => onNodeClick(node)}
			>
				{node.name}
			</Button>
		</div>
		<div>
			{node.subTopics?.map((subTopic) => (
				<TreeNode
					key={subTopic.id}
					node={subTopic}
					onNodeClick={onNodeClick}
				/>
			))}
		</div>
	</div>
);

export default TreeNode;
