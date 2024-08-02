export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};



// export const getDocumentAndSection = (pathname: string) => {
//   const { id } = useParams();
//   //const { subId } = useParams();

//   const { data, error, isLoading } = useGetDocsQuery();


//   const document = data?.find((doc) => slugify(doc.name) === id); //doc.category for the first
//   // const section = document?.sections.find(
//   //   (sec) => slugify(sec.title) === subId
   
//   // );
 



//   return { document, isLoading, error };
// };
