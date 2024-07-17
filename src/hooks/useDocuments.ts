import { useGetDocumentsQuery } from "@/services/documentsApi";

export const useDocuments = () => {
  const { data, error, isLoading } = useGetDocumentsQuery();

  return {
    documents: data,
    error,
    isLoading,
  };
};
