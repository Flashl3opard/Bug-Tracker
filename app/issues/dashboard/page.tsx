"use client";

import React, { useEffect, useState } from "react";

interface Issue {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt?: string;
}

const AllIssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const storedIssues = localStorage.getItem("issues");
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "CLOSED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-600">No issues found.</p>
      ) : (
        <div className="grid gap-6">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="p-5 rounded-xl shadow border border-gray-200 bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{issue.title}</h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    issue.status
                  )}`}
                >
                  {issue.status}
                </span>
              </div>
              <p className="text-gray-700">{issue.description}</p>
              {issue.createdAt && (
                <p className="text-sm text-gray-400 mt-2">
                  Created: {new Date(issue.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssuesPage;
