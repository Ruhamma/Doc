import React, { useState } from "react";
import { Group, Button, Modal, TextInput, Box } from "@mantine/core";
import { Tree, TreeItem, RenderTreeNodeProps } from "@mantine/core";

interface TreeNode extends TreeItem {
  label: string;
  children?: TreeNode[];
}

const initialData: TreeNode[] = [
  { value: "title1", label: "Title 1", children: [] },
];

const TreeExample: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>(initialData);
  const [opened, setOpened] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [parentNode, setParentNode] = useState<TreeNode | null>(null);

  const addNode = () => {
    const newNode: TreeNode = {
      value: `${newNodeLabel}-${Date.now()}`,
      label: newNodeLabel,
      children: [],
    };
    if (parentNode) {
      const addChild = (nodes: TreeNode[]): TreeNode[] =>
        nodes.map((node) => {
          if (node.value === parentNode.value) {
            return { ...node, children: [...(node.children || []), newNode] };
          }
          return node.children
            ? { ...node, children: addChild(node.children) }
            : node;
        });
      setData(addChild(data));
    } else {
      setData([...data, newNode]);
    }
    setOpened(false);
    setNewNodeLabel("");
  };

  const handleNodeClick = (node: TreeNode) => {
    setParentNode(node);
    setOpened(true);
  };

  const renderNode = ({
    node,
    elementProps,
  }: RenderTreeNodeProps<TreeNode>) => (
    <Group gap={5} {...elementProps} onClick={() => handleNodeClick(node)}>
      <span>{node.label}</span>
    </Group>
  );

  return (
    <Box>
      <Tree<TreeNode> data={data} renderNode={renderNode} />
      <Button
        onClick={() => {
          setParentNode(null);
          setOpened(true);
        }}
      >
        Add Title
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add new node"
      >
        <TextInput
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.currentTarget.value)}
          placeholder="Node label"
        />
        <Button onClick={addNode}>Add</Button>
      </Modal>
    </Box>
  );
};

export default TreeExample;
