"use client";

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BlockTypeSelect,
  CodeToggle,
  InsertThematicBreak,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ShowSandpackInfo,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  SandpackConfig,
  SandpackPreset,
  MDXEditorMethods,
  MDXEditorProps,
} from "@mdxeditor/editor";
import { ForwardedRef, forwardRef } from "react";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Hello CodeSandbox</h1>
      <h2 className="text-2xl font-bold mb-3">Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      files: {
        "/App.js": {
          code: defaultSnippetContent,
          active: true,
        },
      },
      snippetFileName: "/App.js",
    } as unknown as SandpackPreset,
  ],
  defaultPreset: "",
};
interface InitializedMDXEditorProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const InitializedMDXEditor = ({
  editorRef,
  ...props
}: InitializedMDXEditorProps) => {
  return (
    <div>
      <MDXEditor
        {...props}
        ref={editorRef}
        contentEditableClassName="prose"
        markdown={`# Welcome to Your Documentation

		This is a placeholder document. You can start by writing your content here.
		
		## Getting Started
		
		- Begin by editing this document.
		- You can add more sections and subsections as needed.
		- Use markdown syntax to format your text, create lists, and add links.
		
		### Example Code Block
		
		\`\`\`javascript
		// Here is an example code block
		console.log("Hello, World!");
		\`\`\`
		`}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", css: "CSS" },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                        <CodeToggle />
                        <InsertThematicBreak />
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
      />
    </div>
  );
};

InitializedMDXEditor.displayName = "InitializedMDXEditor";

export default InitializedMDXEditor;
