"use client";
import { SetStateAction, useRef, useState } from "react";
import { Box, Button } from "@mantine/core";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./mdxeditor/ForwardRefEditor";
import axios from "axios";

export default function Update() {
  const [activeContent, setActiveContent] = useState<string>("");
  const ref = useRef<MDXEditorMethods>(null);

  const fetchContent = async () => {
    try {
      const response = await axios.get(" http://localhost:5000/docs/1");
      setActiveContent(response.data.content);
      if (ref.current) {
        ref.current.setMarkdown(response.data.content);
      }
    } catch (error) {
      console.error("Failed to fetch content", error);
    }
  };

  return (
    <Box className="editor flex-grow overflow-hidden relative">
      <Box className="editor-content h-full overflow-y-auto">
        <ForwardRefEditor
          ref={ref}
          markdown={activeContent}
          onChange={(newContent: SetStateAction<string>) =>
            setActiveContent(newContent)
          }
        />
        <Button
          className="fixed bottom-4 bg-green-500 text-white px-8 py-2 rounded shadow-md hover:bg-green-600"
          variant="outline"
          onClick={fetchContent}
        >
          Fetch and Display Content
        </Button>
      </Box>
    </Box>
  );
}
