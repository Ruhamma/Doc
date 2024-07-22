"use client";
import { useRef, useState } from "react";
import { Box } from "@mantine/core";
import Navbar from "./component/Navbar";
import Sidebar from "./component/side_bar";
import MdxEditor from "./component/mdxeditor/mdxEditor";
import { Node } from "@/types/treeNode";
import { MDXEditorMethods } from "@mdxeditor/editor";

export default function Admin() {
  const [activeContent, setActiveContent] = useState<string>("");
  const ref = useRef<MDXEditorMethods>(null);

  const handleNodeClick = (node: Node) => {
    if (ref.current) {
      const currentMarkdown = ref.current.getMarkdown();
      console.log("Current Markdown:", currentMarkdown);
      ref.current.setMarkdown(node.content || "");
    }
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
          <MdxEditor
            ref={ref}
            markdown={activeContent}
            onChange={handleEditorChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
