import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGetTopicByIdQuery } from "@/app/services/create_api";
import { serializeMDX } from "@/utils/mdx";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import H2Extractor from "./H2";

const customStyle = (isDarkMode: boolean) => ({
  backgroundColor: "rgba(138, 154, 91, 0.1)",
  borderRadius: "8px",
  padding: "1em",
  margin: "1em 0",
  overflowX: "auto",
  width: "100%",
  borderColor: isDarkMode ? "#2e2e2e" : "#f7f7f7",
});

let h2Counter = 0;
const H2 = ({ children }) => {
  const [id, setId] = useState("");

  useEffect(() => {
    h2Counter += 1;
    setId(`h2-${h2Counter}`);
  }, []);

  return (
    <h3 id={id} className="text-3xl py-4">
      <span className="text-red-500">#</span>{" "}
      <span className="text-3xl">{children}</span>
    </h3>
  );
};
const components = {
  h1: ({ children }) => (
    <h1 className="text-xl md:text-3xl font-bold py-6">{children}</h1>
  ),
  h2: H2,
  p: ({ children }) => <p className="text-base">{children}</p>,
  code: ({ children, ...props }) => (
    <SyntaxHighlighter
      language={props.language || "javascript"}
      style={props.isDarkMode ? dark : coy}
      customStyle={customStyle(props.isDarkMode)}
    >
      {children}
    </SyntaxHighlighter>
  ),
};

const ContentDisplay = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/").pop();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const {
    data,
    error: singleDocError,
    isLoading: isSingleDocLoading,
  } = useGetTopicByIdQuery(categoryId);
  console.log("ID data", data);
  const [mdxSource, setMdxSource] = useState<MDXRemoteProps | null>(null);

  useEffect(() => {
    const fetchMDXContent = async () => {
      try {
        if (data?.content) {
          const serialized = await serializeMDX(data.content);
          setMdxSource(serialized);
        }
      } catch (error) {
        console.error("Error fetching MDX content:", error);
      }
    };

    fetchMDXContent();
  }, [data]);

  if (isSingleDocLoading) return <div>Loading...</div>;
  if (singleDocError) return <div>Error: {singleDocError.message}</div>;

  return (
    <div className="w-full md:w-3/4 h-full  overflow-y-auto">
      {data ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">{data.name}</h1>
          <H2Extractor />
          <div>
            {mdxSource ? (
              <MDXRemote {...mdxSource} components={components} />
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-white">Select a category to see its content.</p>
      )}
      {/* <h1 className="my-[400px]" id="h2-5">
        heyyy
      </h1> */}
    </div>
  );
};

export default ContentDisplay;
