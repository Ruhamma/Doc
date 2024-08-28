"use client"; // Ensure this file is treated as a client component

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetContentByIdQuery } from "@/app/services/create_api";
const H2Extractor: React.FC = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/").pop();
  const { data, error, isLoading } =  useGetContentByIdQuery(categoryId);
  const [h2List, setH2List] = useState<{ id: string; text: string }[]>([]);
  const router = useRouter();

  const extractH2FromContent = (
    content: string
  ): { id: string; text: string }[] => {
    const lines = content.split("\n");
    return lines
      .filter((line) => line.trim().startsWith("## ")) // Find lines starting with '## '
      .map((line, index) => ({
        id: `h2-${index + 4}`, // Generate a unique ID for each h2
        text: line.trim().substring(3), // Remove '## ' from the beginning
      }));
  };

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (data && data.content) {
        const headers: { id: string; text: string }[] = [];
        const h2s = extractH2FromContent(data.content);
        if (h2s.length > 0) {
          headers.push(...h2s);
        }
        setH2List(headers);
      } else {
        console.warn("No content found in data");
      }
    }
  }, [data, isLoading, error]);

  const handleClick = (id: string) => {
    router.push(`#${id}`); // Use Next.js router to update the URL

    // Use Intersection Observer to ensure scrolling works
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log(`Scrolling to element with id: ${id}`);
      } else {
        console.warn(`Element with id: ${id} not found`);
      }
    }, 100); // Delay to ensure URL update before scrolling
  };

  // Ensure that your h2 component generates unique and correct IDs
  const H2 = ({ children }: { children: React.ReactNode }) => {
    // Sanitize children to create a valid ID
    const id = `h2-${children.toString().replace(/\s+/g, "-").toLowerCase()}`;
    return (
      <h2 id={id} className="text-xl font-bold py-4">
        {children}
      </h2>
    );
  };

  return (
    <div>
      {h2List.length > 0 ? (
        <nav>
          <ul>
            {h2List.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(id);
                  }}
                  className="flex gap-2 pl-6"
                >
                  <span className="text-red-500">#</span>{" "}
                  <span className="text-blue-500">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <p>No H2 headers found</p>
      )}
    </div>
  );
};

export default H2Extractor;
