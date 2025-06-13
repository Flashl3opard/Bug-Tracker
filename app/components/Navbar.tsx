"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBug, FaConnectdevelop } from "react-icons/fa";
import React, { useRef, useState } from "react";

const Navbar = () => {
  const currPath = usePathname();
  const router = useRouter();
  const devBtnRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Report Issue", href: "/issues/newissue" },
    { label: "Activity logs", href: "/issues/dashboard" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [devID, setDevID] = useState("");
  const [devPass, setDevPass] = useState("");
  const [error, setError] = useState("");

  const handleDevAccess = () => {
    setShowModal(!showModal);
  };

  const handleLogin = () => {
    if (devID === "abc" && devPass === "123") {
      setShowModal(false);
      router.push("/issues/devmode");
    } else {
      setError("Invalid ID or Password");
    }
  };

  return (
    <div className="relative">
      <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex items-center justify-between border-b">
        <Link
          href="/"
          className="text-2xl font-bold text-red-600 flex items-center gap-2"
        >
          <FaBug className="text-3xl" />
          <span>BugTrack</span>
        </Link>

        <ul className="flex gap-6 text-lg font-medium">
          {links.map((link) => {
            const isActive = currPath === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-md"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div ref={devBtnRef} className="relative">
          <button
            onClick={handleDevAccess}
            className="flex flex-col items-center"
          >
            <h1 className="bg-gray-600 p-3 text-xl rounded-full text-white hover:scale-110 hover:bg-gray-800 transition duration-500 hover:animate-spin">
              <FaConnectdevelop />
            </h1>
            <h1>Dev-mode</h1>
          </button>

          {showModal && (
            <div className="absolute right-0 mt-2 w-72 bg-white p-5 rounded-xl shadow-xl border z-50">
              <h2 className="text-lg font-semibold mb-3 text-center">
                Dev Login
              </h2>

              <input
                type="text"
                placeholder="Enter ID (abc)"
                value={devID}
                onChange={(e) => setDevID(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="password"
                placeholder="Enter Password (123)"
                value={devPass}
                onChange={(e) => setDevPass(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
