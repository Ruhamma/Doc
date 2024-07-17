"use client";
import React, { useState } from "react";
import DocForm from "./addForm";
import Sidebar from "./sideBar";
import UpdateForm from "./updateForm";

interface Section {
  id: string;
  title: string;
  content: string;
  example: string;
}

const Main: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [sectionSelection, setSectionSelection] = useState<Section | null>(
    null
  );

  const handleCreateClick = () => {
    setShowForm(true);
    setSectionSelection(null);
  };

  const handleSectionSelect = (section: Section) => {
    setSectionSelection(section);
    setShowForm(false);
  };

  return (
    <div className="flex">
      <Sidebar
        onCreateClick={handleCreateClick}
        onSelectSection={handleSectionSelect}
      />
      <div className="main-content p-6 flex-grow">
        {showForm ? (
          <DocForm />
        ) : sectionSelection ? (
          <UpdateForm key={sectionSelection.id} section={sectionSelection} />
        ) : (
          <p>Main</p>
        )}
      </div>
    </div>
  );
};

export default Main;
