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
    <nav className="flex space-x-6 border-b mb-10  px-5 h-14 items-center justify-between">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-10 font-semibold  m-10 text-xl ease-in ">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${
              link.href === currPath ? "text-zinc-900" : "text-zinc-500"
            } text-zinc-500 hover:text-black transition 300s`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
