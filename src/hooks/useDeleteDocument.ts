import { useDeleteDocumentMutation } from "@/services/documentsApi";

export const useDeleteDocument = () => {
  const [deleteDocument, { data, error, isLoading }] =
    useDeleteDocumentMutation();

  const handleDelete = async (documentId: string) => {
    await deleteDocument(documentId);
  };

  return {
    handleDelete,
    data,
    error,
    isLoading,
  };
};
