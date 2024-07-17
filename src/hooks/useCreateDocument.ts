import { useCreateDocumentMutation } from "@/services/documentsApi";

export const useCreateDocument = () => {
  const [createDocument, { data, error, isLoading }] =
    useCreateDocumentMutation();

  const handleCreate = async (newDocument: Partial<Document>) => {
    await createDocument(newDocument);
  };

  return {
    handleCreate,
    data,
    error,
    isLoading,
  };
};
