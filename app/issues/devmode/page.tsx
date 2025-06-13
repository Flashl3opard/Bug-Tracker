"use client";

import React, { useEffect, useState } from "react";

interface Issue {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

const DevModePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const storedIssues = localStorage.getItem("issues");
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  const updateStatus = (index: number, newStatus: Issue["status"]) => {
    const updated = [...issues];
    updated[index].status = newStatus;
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Developer Mode</h1>

      {issues.length === 0 ? (
        <p className="text-gray-500 text-center">No issues found.</p>
      ) : (
        <div className="space-y-6">
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{issue.title}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    issue.status === "OPEN"
                      ? "bg-yellow-200 text-yellow-900"
                      : issue.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-900"
                      : "bg-green-200 text-green-900"
                  }`}
                >
                  {issue.status}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{issue.description}</p>
              <div className="flex gap-3">
                {issue.status !== "OPEN" && (
                  <button
                    onClick={() => updateStatus(idx, "OPEN")}
                    className="bg-yellow-400 px-3 py-1 rounded text-sm hover:opacity-90"
                  >
                    Set to OPEN
                  </button>
                )}
                {issue.status !== "IN_PROGRESS" && (
                  <button
                    onClick={() => updateStatus(idx, "IN_PROGRESS")}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                  >
                    Set to IN_PROGRESS
                  </button>
                )}
                {issue.status !== "CLOSED" && (
                  <button
                    onClick={() => updateStatus(idx, "CLOSED")}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                  >
                    Set to CLOSED
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevModePage;
