"use client";
import React from "react";
import Link from "next/link";
// import { useGetDocsQuery } from "@/store/api";
import { useGetTopicsQuery } from "@/app/services/create_api";
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
  } = useGetTopicsQuery();

  console.log(" data", data);


  return (
    <div className="w-[365px] h-full border-b border-gray-200 dark:border-gray-700 pl-8 overflow-y-auto">
      {isAllDataLoading ? (
        <p>Loading...</p>
      ) : allDataError ? (
        <p>Error loading data</p>
      ) : data && Array.isArray(data) ? (
        <ul>
          {data.map((dat: any) => (
            <li key={dat.id} className="mb-2">
              <Link
                href={`/tests/categories/${dat.id}`}
                passHref
                className="hover:text-red-500 w-full text-[18px] p-2 block"
              >
                <p className="font-bold">{dat.name}</p>
              </Link>
              {dat.subcategories && Array.isArray(dat.subcategories) ? (
                <ul>
                  {dat.subcategories.map((sub: any) => (
                    <li key={sub.id} className=" pr-8 w-full text-md">
                      <Link
                        href={`/tests/categories/${sub.id}`}
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
