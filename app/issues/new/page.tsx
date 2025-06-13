"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface IssueForm {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IssueForm>();

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem("issueDraft");
    if (draft) reset(JSON.parse(draft));
  }, [reset]);

  // Save draft on change
  useEffect(() => {
    const subscription = watch((value) =>
      localStorage.setItem("issueDraft", JSON.stringify(value))
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: IssueForm) => {
    setLoading(true);
    try {
      await axios.post("/api/issues", data);
      toast.success("Issue created successfully!");
      localStorage.removeItem("issueDraft");
      router.push("/issues");
    } catch (err) {
      console.error("Failed to submit issue:", err);
      toast.error("Failed to create issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl p-4">
      <Toaster />

      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <label className="block text-sm font-medium text-gray-700">
        Priority
      </label>
      <select
        {...register("priority", { required: "Priority is required" })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
      {errors.priority && (
        <p className="text-red-500 text-sm">{errors.priority.message}</p>
      )}

      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Describe the issue..." />
        )}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit New Issue"}
      </Button>
    </form>
  );
};

export default Page;
