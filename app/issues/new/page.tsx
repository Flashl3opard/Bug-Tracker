"use client";

import React from "react";
import { Button } from "@radix-ui/themes";
import dynamic from "next/dynamic"; // ✅ dynamic import
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// ✅ Dynamically import SimpleMDE (client-side only)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const Page = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error("Failed to submit issue:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl p-4">
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SimpleMDE
            {...field}
            options={{
              placeholder: "Enter issue description...",
              spellChecker: false,
              autofocus: true,
            }}
          />
        )}
      />

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default Page;
