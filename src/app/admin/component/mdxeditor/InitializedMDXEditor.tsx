"use client";
import { useRef } from "react";
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
} from "@mdxeditor/editor";

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

const InitializedMDXEditor = ({ ...props }) => {
  const editorRef = useRef(null);

  return (
    <div>
      <MDXEditor
        ref={editorRef}
        contentEditableClassName="prose"
        markdown="Hello world"
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
        {...props}
      />
    </div>
  );
};

export default InitializedMDXEditor;
