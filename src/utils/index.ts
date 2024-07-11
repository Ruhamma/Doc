import { useGetDocsQuery } from "@/store/api";


export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const getDocumentAndSection = (pathname: string) => {
  const slug = pathname.split("/").pop();
  const docTitle = pathname.split("/")[2];

  const { data, error, isLoading } = useGetDocsQuery();

  const document = data?.find((doc) => slugify(doc.title) === docTitle);
  const section = document?.sections.find((sec) => slugify(sec.title) === slug);

  return { document, section, isLoading, error };
};
