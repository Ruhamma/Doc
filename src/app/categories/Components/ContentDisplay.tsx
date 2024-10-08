import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGetContentByIdQuery } from "@/app/services/create_api";
import { serializeMDX } from "@/utils/mdx";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";
import H2Extractor from "./H2";
// import { Box, Skeleton } from "@mantine/core";

// Define a type for the custom style function
type CustomStyle = {
  backgroundColor: string;
  borderRadius: string;
  padding: string;
  margin: string;
  overflowX: string;
  width: string;
  borderColor: string;
};

// Adjust the custom style function to return the correct type
const customStyle = (isDarkMode: boolean): CustomStyle => ({
  backgroundColor: "rgba(138, 154, 91, 0.1)",
  borderRadius: "8px",
  padding: "1em",
  margin: "1em 0",
  overflowX: "auto",
  width: "100%",
  borderColor: isDarkMode ? "#2e2e2e" : "#f7f7f7",
});

let h2Counter = 0;

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<string>("");

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

// Define types for custom MDX components
const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-xl md:text-3xl font-bold py-6">{children}</h1>
  ),
  h2: H2,
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base">{children}</p>
  ),
  code: ({
    children,
    ...props
  }: {
    children: string;
    language?: string;
    isDarkMode?: boolean;
  }) => (
    <SyntaxHighlighter
      language={props.language || "javascript"}
      style={props.isDarkMode ? dark : coy}
      customStyle={customStyle(props.isDarkMode || false)}
    >
      {children}
    </SyntaxHighlighter>
  ),
};

const ContentDisplay: React.FC = () => {
  const pathname = usePathname();
  const categoryId = pathname ? pathname.split("/").pop() : "";

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const {
    data,
    error: singleDocError,
    isLoading: isSingleDocLoading,
  } = useGetContentByIdQuery(categoryId || "");

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

  // if (isSingleDocLoading) {
  //   return (
  //     <Box className="flex-grow p-4">
  //       <Skeleton height={40} radius="xl" />
  //       <Skeleton height={40} mt={6} radius="xl" />
  //       <Skeleton height={40} mt={6} width="80%" radius="xl" />
  //       <Skeleton height={40} mt={6} radius="xl" />
  //       <Skeleton height={200} mt={6} radius="xl" />
  //     </Box>
  //   );
  // }

  // if (singleDocError) return <div>Error: {singleDocError.message}</div>;

  return (
    <div className="w-full p-6 md:w-3/4 h-full overflow-y-auto">
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
        <p>Select a category to see its content.</p>
      )}
    </div>
  );
};

export default ContentDisplay;
