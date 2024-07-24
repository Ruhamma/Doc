"use client";
import { useRef, useState } from "react";
import { Box, Button, Flex } from "@mantine/core";
import Navbar from "./component/Navbar";
import Sidebar from "./component/side_bar";
import { Node } from "@/types/treeNode";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./component/mdxeditor/ForwardRefEditor";
import Update from "./component/update";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [activeContent, setActiveContent] = useState<string>("");
  const ref = useRef<MDXEditorMethods>(null);

  const handleNodeClick = (node: Node) => {
    console.log(ref);
    if (ref.current) {
      const currentMarkdown = ref.current.getMarkdown();
      console.log("Current Markdown:", currentMarkdown);
      ref.current.setMarkdown(`# ${node.title}`);
    }
    setActiveContent(node.content || "");
    const path = `/admin/subtitle/${node.title}`;
    router.push(path);
  };

  const handleEditorChange = (newContent: string) => {
    setActiveContent(newContent);
  };

  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <Sidebar onNodeClick={handleNodeClick} />

        {/* <Update /> */}
        <Box className="editor flex-grow overflow-hidden relative">
          <Box className="editor-content h-full overflow-y-auto">
            <ForwardRefEditor
              ref={ref}
              markdown={activeContent}
              onChange={handleEditorChange}
            />
            {/* <Flex>
              <Button
                className="fixed bottom-4  bg-green-500 text-white px-8 py-2 rounded shadow-md hover:bg-green-600"
                variant="outline"
                onClick={() => console.log(ref.current?.getMarkdown())}
              >
                Create Doc
              </Button>
            </Flex> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
