import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "./ForwardRefEditor";

interface MdxEditorProps {
  markdown: string;
  onChange: (newContent: string) => void;
}

const MdxEditor = forwardRef<MDXEditorMethods, MdxEditorProps>(
  ({ markdown, onChange }, ref) => {
    const localRef = useRef<MDXEditorMethods>(null);
    const [isClient, setIsClient] = useState(false);

    useImperativeHandle(ref, () => localRef.current!);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <div>
        {isClient && (
          <ForwardRefEditor
            ref={localRef}
            markdown={markdown}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
);

MdxEditor.displayName = "MdxEditor";

export default MdxEditor;
