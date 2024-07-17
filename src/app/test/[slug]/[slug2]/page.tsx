import Content from "@/app/_component/content";
import Header from "@/app/_component/header";
import Sidebar from "@/app/_component/sidebar";
import Subsections from "@/app/_component/subsection";
import React from "react";

const SlugPage: React.FC = () => (
  <div>
    <Header />
    <div className="container">
      <Sidebar />
      <Content />
      {/* <Subsections /> */}
    </div>
  </div>
);

export default SlugPage;
