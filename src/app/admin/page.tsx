"use client";
import { useState } from "react";
import { Box } from "@mantine/core";
import Navbar from "./component/Navbar";
import Sidebar from "./component/side_bar";
import MdxEditor from "./component/mdxeditor/mdxEditor";
import { Node } from "@/types/treeNode";

export default function Admin() {
  const [activeContent, setActiveContent] = useState("");

  const handleNodeClick = (node: Node) => {
    setActiveContent(node.content || "");
  };

  const handleEditorChange = (newContent: string) => {
    setActiveContent(newContent);
  };

  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar w-full bg-gray-300 h-16">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full">
        <Box className="sidebar w-1/5 bg-gray-200">
          <Sidebar onNodeClick={handleNodeClick} />
        </Box>
        <Box className="editor flex-grow">
          <MdxEditor markdown={activeContent} onChange={handleEditorChange} />
        </Box>
      </Box>
    </Box>
  );
}
