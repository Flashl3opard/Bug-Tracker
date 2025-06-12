"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  const currPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-10 px-5 h-14 items-center justify-between shadow-md">
      <Link
        href="/"
        className="text-2xl text-red-600 flex items-center gap-1 font-extrabold"
      >
        <FaBug />
        BugTrack
      </Link>
      <ul className="flex space-x-10 font-semibold m-10 text-xl ease-in">
        {links.map((link) => (
          <li key={link.href} className=" ">
            <Link
              href={link.href}
              className={`${
                link.href === currPath
                  ? "text-zinc-900 bg-yellow-500"
                  : "text-zinc-500 "
              } hover:text-black transition-colors duration-300 border-1 p-2 rounded-2xl shadow-2xl`}
              aria-current={link.href === currPath ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
