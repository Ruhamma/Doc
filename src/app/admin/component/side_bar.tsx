// import { useState } from "react";
// import { Button, TextInput, Stack, Flex } from "@mantine/core";
// import { nanoid } from "nanoid";
// import { SidebarProps, TreeNodeProps, Node } from "@/types/treeNode";

// const TreeNode = ({ node, onNodeClick }: TreeNodeProps) => (
//   <div className="ml-4 mt-2">
//     <div>
//       <Button variant="subtle" color="green" onClick={() => onNodeClick(node)}>
//         {node.title}
//       </Button>
//     </div>
//     <div>
//       {node.subtitles.map((subtitle) => (
//         <TreeNode key={subtitle.id} node={subtitle} onNodeClick={onNodeClick} />
//       ))}
//     </div>
//   </div>
// );

// const SideBar = ({ onNodeClick }: SidebarProps) => {
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newSubtitles, setNewSubtitles] = useState<string[]>([""]);
//   const [isTitleSet, setIsTitleSet] = useState(false);
//   const [areSubtitlesSet, setAreSubtitlesSet] = useState<boolean[]>([]);

//   const handleAddSubtitleField = () => {
//     if (!isTitleSet && newTitle.trim() !== "") {
//       setIsTitleSet(true);
//     }
//     if (newSubtitles.every((subtitle) => subtitle.trim() !== "")) {
//       setAreSubtitlesSet([...areSubtitlesSet, true]);
//       setNewSubtitles([...newSubtitles, ""]);
//     }
//   };

//   const handleSubtitleChange = (index: number, value: string) => {
//     const updatedSubtitles = [...newSubtitles];
//     updatedSubtitles[index] = value;
//     setNewSubtitles(updatedSubtitles);
//   };

//   return (
//     <div className="sidebar p-6">
//       <Flex direction={"column"} gap={"md"}>
//         {!isTitleSet ? (
//           <TextInput
//             placeholder="Title"
//             value={newTitle}
//             onChange={(event) => setNewTitle(event.currentTarget.value)}
//             variant="filled"
//             styles={{
//               input: { border: "1px solid green", borderRadius: "4px" },
//             }}
//           />
//         ) : (
//           <Button variant="subtle" color="green">
//             {newTitle}
//           </Button>
//         )}
//         {newSubtitles.map((subtitle, index) =>
//           areSubtitlesSet[index] ? (
//             <Button
//               key={index}
//               variant="subtle"
//               color="green"
//               style={{ marginLeft: "20px" }}
//             >
//               {subtitle}
//             </Button>
//           ) : (
//             <TextInput
//               key={index}
//               placeholder={`Subtitle ${index + 1}`}
//               value={subtitle}
//               onChange={(event) =>
//                 handleSubtitleChange(index, event.currentTarget.value)
//               }
//               variant="filled"
//               styles={{
//                 input: {
//                   border: "1px solid green",
//                   borderRadius: "4px",
//                   marginLeft: "20px",
//                 },
//               }}
//             />
//           )
//         )}
//         <Stack>
//           <Button color="green" onClick={handleAddSubtitleField}>
//             Add Subtitle
//           </Button>
//         </Stack>
//       </Flex>
//       {nodes.map((node) => (
//         <TreeNode key={node.id} node={node} onNodeClick={onNodeClick} />
//       ))}
//     </div>
//   );
// };

// export default SideBar;
