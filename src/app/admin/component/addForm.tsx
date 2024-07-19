// import React from "react";
// import { useCreateDocsMutation } from "@/store/api";
// import {
//   useForm,
//   useFieldArray,
//   Control,
//   UseFormRegister,
// } from "react-hook-form";

// interface SubSection {
//   title: string;
//   content: string;
//   example: string;
// }

// interface Section {
//   title: string;
//   content: string;
//   subSections: SubSection[];
// }

// interface Document {
//   title: string;
//   content: string;
//   subSections: SubSection[];
// }

// interface FormValues {
//   documents: Document[];
// }

// const DocForm: React.FC = () => {
//   const { control, register, handleSubmit } = useForm<FormValues>({
//     defaultValues: {
//       documents: [
//         {
//           title: "",
//           content: "",
//           subSections: [
//             {
//               title: "",
//               content: "",
//               example: "",
//             },
//           ],
//         },
//       ],
//     },
//   });

//   const {
//     fields: docFields,
//     append: appendDoc,
//     remove: removeDoc,
//   } = useFieldArray({
//     control,
//     name: "documents",
//   });

//   const [addNewDocs, { isLoading }] = useCreateDocsMutation();

//   const onSubmit = async (data: FormValues) => {
//     try {
//       await addNewDocs(data).unwrap();
//       console.log("Submitted successfully:", data);
//     } catch (error) {
//       console.error("Failed to submit data:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {docFields.map((doc, docIndex) => (
//         <div key={doc.id} className="border p-4 space-y-2">
//           <label>
//             Document Title:
//             <input
//               {...register(`documents.${docIndex}.title`)}
//               className="block border p-1"
//             />
//           </label>
//           <label>
//             Document Content:
//             <textarea
//               {...register(`documents.${docIndex}.content`)}
//               className="block border p-1"
//             />
//           </label>
//           <SubSectionForm
//             control={control}
//             register={register}
//             docIndex={docIndex}
//           />
//           <button
//             type="button"
//             onClick={() => removeDoc(docIndex)}
//             className="bg-red-500 text-white p-1"
//           >
//             Remove Document
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => appendDoc({ title: "", content: "", subSections: [] })}
//         className="bg-blue-500 text-white p-2"
//       >
//         Add Document
//       </button>
//       <button type="submit" className="bg-green-500 text-white p-2">
//         Submit
//       </button>
//     </form>
//   );
// };

// interface SubSectionFormProps {
//   control: Control<FormValues>;
//   register: UseFormRegister<FormValues>;
//   docIndex: number;
// }

// const SubSectionForm: React.FC<SubSectionFormProps> = ({
//   control,
//   register,
//   docIndex,
// }) => {
//   const {
//     fields: subSectionFields,
//     append: appendSubSection,
//     remove: removeSubSection,
//   } = useFieldArray({
//     control,
//     name: `documents.${docIndex}.subSections`,
//   });

//   return (
//     <div className="space-y-2">
//       {subSectionFields.map((subSection, subSectionIndex) => (
//         <div key={subSection.id} className="border p-2 space-y-2">
//           <label>
//             Sub-Section Title:
//             <input
//               {...register(
//                 `documents.${docIndex}.subSections.${subSectionIndex}.title`
//               )}
//               className="block border p-1"
//             />
//           </label>
//           <label>
//             Sub-Section Content:
//             <textarea
//               {...register(
//                 `documents.${docIndex}.subSections.${subSectionIndex}.content`
//               )}
//               className="block border p-1"
//             />
//           </label>
//           <label>
//             Code Example:
//             <textarea
//               {...register(
//                 `documents.${docIndex}.subSections.${subSectionIndex}.example`
//               )}
//               className="block border p-1"
//             />
//           </label>
//           <button
//             type="button"
//             onClick={() => removeSubSection(subSectionIndex)}
//             className="bg-red-500 text-white p-1"
//           >
//             Remove Sub-Section
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() =>
//           appendSubSection({ title: "", content: "", example: "" })
//         }
//         className="bg-blue-500 text-white p-1"
//       >
//         Add Sub-Section
//       </button>
//     </div>
//   );
// };

// export default DocForm;
