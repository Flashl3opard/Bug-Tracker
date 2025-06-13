"use client";

import React, { useEffect, useState } from "react";

interface Issue {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

const statusColors: Record<Issue["status"], string> = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-green-100 text-green-800",
};

const priorityColors: Record<Issue["priority"], string> = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-200 text-blue-900",
  HIGH: "bg-orange-200 text-orange-900",
  CRITICAL: "bg-red-200 text-red-900",
};

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");

  useEffect(() => {
    const storedIssues = localStorage.getItem("issues");
    if (storedIssues) {
      const parsed = JSON.parse(storedIssues);
      setIssues(parsed);
      setFilteredIssues(parsed);
    }
  }, []);

  useEffect(() => {
    let filtered = [...issues];

    if (statusFilter) {
      filtered = filtered.filter((issue) => issue.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter((issue) => issue.priority === priorityFilter);
    }

    setFilteredIssues(filtered);
  }, [statusFilter, priorityFilter, issues]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredIssues.length === 0 ? (
          <p className="text-gray-600">No issues found.</p>
        ) : (
          filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{issue.title}</h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    statusColors[issue.status]
                  }`}
                >
                  {issue.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 my-2">
                {issue.description.length > 100
                  ? issue.description.slice(0, 100) + "..."
                  : issue.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span
                  className={`px-2 py-1 rounded ${
                    priorityColors[issue.priority]
                  }`}
                >
                  {issue.priority}
                </span>
                <span>{new Date(issue.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
