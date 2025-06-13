"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import React from "react";
import { FaConnectdevelop } from "react-icons/fa";

const Navbar = () => {
  const currPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Report Issue", href: "/issues/newissue" },
    { label: "All Issues", href: "/issues/dashboard" },
  ];

  return (
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
      <Link href="/issues/devmode" className="flex flex-col items-center">
        <h1 className="bg-gray-600 p-3 text-xl rounded-full text-white hover:scale-110 hover:bg-gray-800 transition 500s ease in hover:animate-spin">
          <FaConnectdevelop />
        </h1>
        <h1>Dev-mode</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
