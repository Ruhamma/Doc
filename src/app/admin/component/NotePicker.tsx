"use client";
import React, { useState } from "react";
import Tiptap from "./TipTap";
import { v4 as uuidv4 } from "uuid";

function NotePicker() {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: content,
    };
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center pt-10 mb-10 mx-auto"
    >
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
}

export default NotePicker;
