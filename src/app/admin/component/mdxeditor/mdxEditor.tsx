import { useEffect, useRef, useState } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./ForwardRefEditor";

export default function MdxEditor() {
  const ref = useRef<MDXEditorMethods>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <>
          <button onClick={() => console.log(ref.current?.getMarkdown())}>
            Get markdown
          </button>
          <ForwardRefEditor
            ref={ref}
            markdown="## hello world"
            onChange={console.log}
          />
        </>
      )}
    </div>
  );
}
