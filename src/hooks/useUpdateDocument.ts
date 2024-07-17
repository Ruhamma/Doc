import { useUpdateDocumentMutation } from "@/services/documentsApi";

export const useUpdateDocument = () => {
  const [updateDocument, { data, error, isLoading }] =
    useUpdateDocumentMutation();

  const handleUpdate = async (id: string, updatedDocument: string) => {
    await updateDocument({ id, data: updatedDocument });
  };

  return {
    handleUpdate,
    data,
    error,
    isLoading,
  };
};
