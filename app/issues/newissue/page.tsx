"use client";

import React from "react";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
  priority: string;
}

const logActivity = (
  type: "CREATED" | "UPDATED" | "CLOSED",
  message: string
) => {
  const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
  logs.push({ type, message, timestamp: new Date().toISOString() });
  localStorage.setItem("activityLogs", JSON.stringify(logs));
};

const Page = () => {
  const router = useRouter();
  const { register, control, handleSubmit, reset } = useForm<IssueForm>();

  const onSubmit = (data: IssueForm) => {
    try {
      const existingIssues = JSON.parse(localStorage.getItem("issues") || "[]");
      const newIssue = {
        ...data,
        id: Date.now(),
        status: "OPEN",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "issues",
        JSON.stringify([newIssue, ...existingIssues])
      );

      logActivity("CREATED", `Issue "${data.title}" was created.`);

      reset();
      router.push("/issues");
    } catch (error) {
      console.error("Failed to store issue:", error);
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
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />

      <select
        {...register("priority")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
};

export default Page;
