"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Loader, Skeleton } from "@mantine/core";
import Navbar from "./component/Navbar";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./component/mdxeditor/ForwardRefEditor";
import { useRouter, useSearchParams } from "next/navigation";
import TopicsSideBar from "./component/tree/TopicsSideBar";
import { Topic } from "@/types/topic";
import { useGetTopicsQuery } from "../services/create_api";
import SkeletonLayout from "./component/skeleton";
import { IconDeviceFloppy, IconDownload, IconTrash } from "@tabler/icons-react";

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeContent, setActiveContent] = useState<string>("");
  const ref = useRef<MDXEditorMethods>(null);
  const { data: topics, error, isLoading } = useGetTopicsQuery();
  useEffect(() => {
    const nodeId = searchParams.get("id");
    if (nodeId && topics) {
      const node = findNodeById(topics, nodeId);
      if (node && ref.current) {
        ref.current.setMarkdown(node.content || "");
        setActiveContent(node.content || "");
      }
    }
  }, [searchParams, topics]);

  if (isLoading) {
    return (
      <>
        <SkeletonLayout />
      </>
    );
  }

  if (error) {
    return <Flex>{error.toString()}</Flex>;
  }

  const handleNodeClick = (node: Topic) => {
    const path = `/admin?id=${node.id}`;
    router.push(path);
  };
  const handleEditorChange = (newContent: string) => {
    setActiveContent(newContent);
  };

  const findNodeById = (nodes: Topic[], id: string): Topic | null => {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.subTopics) {
        const foundNode = findNodeById(node.subTopics, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  return (
    <Box className="flex flex-col w-full h-screen">
      <Box className="navbar fixed w-full bg-gray-300 h-16 z-10">
        <Navbar />
      </Box>
      <Box className="flex flex-row h-full pt-16">
        <TopicsSideBar topics={topics ?? []} onNodeClick={handleNodeClick} />
        <Box className="editor flex-grow overflow-hidden relative">
          <Box className="editor-content h-full overflow-y-auto">
            <ForwardRefEditor
              ref={ref}
              markdown={activeContent}
              onChange={handleEditorChange}
            />
          </Box>
        </Box>
      </Box>
      <Box className="fixed right-4 bottom-4 flex space-x-4 p-10">
        <Button
          className=" text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
          variant="filled"
          color="gray"
          onClick={() => console.log(ref.current?.getMarkdown())}
        >
          <IconDownload size={20} />
          Save
        </Button>
        <Button
          className="text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
          variant="outline"
          color="red"
          onClick={() => console.log("Secondary Action")}
        >
          <IconTrash size={20} />
          Delete
        </Button>
      </Box>
    </Box>
  );
}
