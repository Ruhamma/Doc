import React from "react";
import { useForm } from "react-hook-form";
import { Section } from "@/types";
import { useEditSubSectionMutation } from "@/store/api";

interface UpdateFormProps {
  section: Section;
  onUpdate?: (updatedSection: Section) => void; // Optional callback if needed
}

type FormData = {
  title: string;
  content: string;
  example: string;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ section }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: section.title,
      content: section.content,
      example: section.example,
    },
  });

  const [editSubSection] = useEditSubSectionMutation();

  const onSubmit = async (data: FormData) => {
    // const updatedSection = { ...section, ...data };
    //console.log("Updated Section Data:", updatedSection);

    try {
      await editSubSection({ id: section.id, ...data }).unwrap();
      console.log("Successfully updated section!");
      // if (onUpdate) {
      //   onUpdate(updatedSection);
      // }
      console.log("updated data", data);
    } catch (error) {
      console.error("Failed to update section:", error);
      console.log("updated data", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 px-20">
      <div>
        <label className="block text-lg font-bold text-dark py-2">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-lg font-bold text-dark py-2">
          Content
        </label>
        <textarea
          {...register("content")}
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <div>
        <label className="block text-lg font-bold text-dark py-2">
          Code Example
        </label>
        <textarea
          {...register("example")}
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Update
      </button>
    </form>
  );
};

export default UpdateForm;
