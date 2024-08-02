"use client";
import React from "react";
import Link from "next/link";
import { useGetDocsQuery } from "@/store/api";
import { slugify } from "@/utils";

interface SidebarProps {
  onCategoryClick: (categoryId: string) => void;
  onSubCategoryClick: (sub: any) => void;
}

const Sidebar = () => {
  const {
    data,
    error: allDataError,
    isLoading: isAllDataLoading,
  } = useGetDocsQuery();

  console.log(" flat data", data);

  function convertToTree(flatData: any[] = []) {
    // Create a map to hold references to all nodes by their ID
    const nodeMap = new Map();

    // Initialize an empty array for the root nodes
    const tree: {
      id: any;
      name: any;
      content: any;
      subCategory: any[]; // Initialize an empty array for subcategories
    }[] = [];

    // Check if flatData is an array before using forEach
    if (Array.isArray(flatData)) {
      // Iterate over the flat data to populate the node map
      flatData.forEach(
        (node: { id: any; name: any; content: any; parentId: any }) => {
          // Create a new node
          const newNode = {
            id: node.id,
            name: node.name,
            content: node.content,
            subCategory: [], // Initialize an empty array for subcategories
          };

          // Add the new node to the node map
          nodeMap.set(node.id, newNode);

          // If the node has a parent, add it as a subcategory
          if (node.parentId) {
            const parent = nodeMap.get(node.parentId);
            if (parent) {
              parent.subCategory.push(newNode);
            }
          } else {
            // If there's no parentId, this is a root node
            tree.push(newNode);
          }
        }
      );
    }

    return tree;
  }

  const newData = convertToTree(data);

  return (
    <div className="w-[365px] h-full border-b border-gray-200 dark:border-gray-700 pl-8 overflow-y-auto">
      {isAllDataLoading ? (
        <p>Loading...</p>
      ) : allDataError ? (
        <p>Error loading data</p>
      ) : newData && Array.isArray(newData) ? (
        <ul>
          {newData.map((dat: any) => (
            <li key={dat.id} className="mb-2">
              <Link
                href={`/tests/${dat.id}`}
                passHref
                className="hover:text-red-500 w-full text-[18px] p-2 block"
              >
                <p className="font-bold">{dat.name}</p>
              </Link>
              {dat.subCategory && Array.isArray(dat.subCategory) ? (
                <ul>
                  {dat.subCategory.map((sub: any) => (
                    <li key={sub.id} className=" pr-8 w-full text-md">
                      <Link
                        href={`/tests/${sub.id}`}
                        passHref
                        className="hover:text-red-500 w-full pl-10 py-1 text-[16px] block"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No subcategories available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Sidebar;
