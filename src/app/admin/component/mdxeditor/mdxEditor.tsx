import { useEffect, useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./ForwardRefEditor";

const MdxEditor = () => {
  const ref = useRef<MDXEditorMethods>(null);
  const [isClient, setIsClient] = useState(false);
  const [markdown, setMarkdown] = useState("Hello world");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (newContent: string) => {
    setMarkdown(newContent);
  };

  return (
    <div>
      {isClient && (
        <>
          <ForwardRefEditor
            ref={ref}
            markdown={markdown}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default MdxEditor;
