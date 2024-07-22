"use client";
import { useRef, useState } from "react";
import { Box } from "@mantine/core";
import Navbar from "./component/Navbar";
import Sidebar from "./component/side_bar";
import { Node } from "@/types/treeNode";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./component/mdxeditor/ForwardRefEditor";

export default function Admin() {
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
					<ForwardRefEditor
						ref={ref}
						markdown={activeContent}
						onChange={handleEditorChange}
					/>
				</Box>
			</Box>
		</Box>
	);
}
