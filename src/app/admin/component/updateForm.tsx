import React from "react";
import { useForm } from "react-hook-form";

interface UpdateFormTitleProps {
  title: string;
}

const UpdateFormTitle: React.FC<UpdateFormTitleProps> = ({ title }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title,
    },
  });

  const onSubmit = (data: { title: string }) => {
    console.log("Updated Title:", data.title);
    // Handle the form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Update</p>
      <input
        type="text"
        {...register("title")}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="w-full flex justify-end absolute bottom-1 left-0 p-2">
        <button
          className="w-[120px] p-1 h-auto bg-purple-900 text-white rounded-md"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateFormTitle;
