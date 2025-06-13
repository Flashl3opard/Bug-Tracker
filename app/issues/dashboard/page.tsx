"use client";

import React, { useEffect, useState } from "react";

interface ActivityLog {
  message: string;
  type: "CREATED" | "UPDATED" | "CLOSED";
  timestamp: string;
}

const ActivityLogsPage = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem("activityLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CREATED":
        return "bg-green-100 text-green-800";
      case "UPDATED":
        return "bg-yellow-100 text-yellow-800";
      case "CLOSED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Activity Logs</h1>

      {logs.length === 0 ? (
        <p className="text-gray-600">No activity recorded yet.</p>
      ) : (
        <ul className="space-y-4">
          {logs
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .map((log, index) => (
              <li
                key={index}
                className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800">{log.message}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(
                    log.type
                  )}`}
                >
                  {log.type}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLogsPage;
