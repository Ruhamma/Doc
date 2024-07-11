import Content from "@/app/_component/content";
import Sidebar from "@/app/_component/sidebar";
import Subsections from "@/app/_component/subsection";
import React from "react";

const SlugPage: React.FC = () => (
  <div className="container">
    <Sidebar />
    <Content />
    <Subsections />
  </div>
);

export default SlugPage;
