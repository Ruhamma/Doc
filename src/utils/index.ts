import { useGetDocsQuery } from "@/store/api";
import { slugify } from "@/utils/slugify";
import { Section } from "@/types";

export const getDocumentAndSection = (pathname: string) => {
  const { data, error, isLoading } = useGetDocsQuery();

  if (isLoading || error)
    return { document: null, section: null, isLoading, error };

  const parts = pathname.split("/");
  const slug = parts.pop();
  const docTitle = parts[2];

  // Find the document matching the docTitle
  const document = data?.find(
    (doc) => slugify(doc.documents[0].title) === docTitle
  );

  if (!document) {
    console.error(`Document with title '${docTitle}' not found.`);
    return {
      document: null,
      section: null,
      isLoading: false,
      error: "Document not found",
    };
  }

  // Assuming document.sections is an array of sections
  let section: Section | null = null;
  document.documents.forEach((doc) => {
    if (!section) {
      section =
        doc.subSections?.find((sec) => slugify(sec.title) === slug) || null;
    }
  });

  if (!section) {
    console.error(
      `Section with slug '${slug}' not found in document '${docTitle}'.`
    );
    return {
      document,
      section: null,
      isLoading: false,
      error: "Section not found",
    };
  }

  return { document, section, isLoading: false, error: null };
};
