"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-3 max-w-xl ">
      <input
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <TextArea placeholder="description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default Page;
