import { useEffect, useRef, useState } from "react";

import type { MDXEditorMethods } from "@mdxeditor/editor";
import InitializedMDXEditor from "./InitializedMDXEditor";

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
          {/* <button onClick={() => ref.current?.setMarkdown("new markdown")}>
            Set new markdown
          </button> */}
          <button onClick={() => console.log(ref.current?.getMarkdown())}>
            Get markdown
          </button>
          <InitializedMDXEditor
            ref={ref}
            markdown="hello world"
            onChange={console.log}
          />
        </>
      )}
    </div>
  );
}
