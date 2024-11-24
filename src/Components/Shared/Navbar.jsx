"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession(); // Destructure session data

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/Contact" },
    { title: "About", path: "/About" },
  ];

  // Check if the current path is for admin pages
  const isAdminPath =
    pathName.includes("Dashboard") || pathName.includes("ManageUser");

  const currentLinks = isAdminPath ? adminLinks : links;

  const handleNavigation = () => router.push("/api/auth/signin");

  return (
    <div
      className={`navbar bg-base-100 ${
        isAdminPath ? "bg-blue-500" : "bg-purple-500"
      }`}
    >
      <div className="navbar max-w-[1200px] mx-auto">
        <div className="navbar-start">
          {/* Hamburger Menu for Mobile */}
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {currentLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.path}
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            Next Hero
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {currentLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className={`px-4 py-2 ${
                    pathName === link.path
                      ? "text-red-400 border-b-2 border-red-400"
                      : "hover:text-red-400"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end space-x-4">
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={50}
            height={50}
          />
          <p>{session?.user?.name}</p>
          <p>{session?.user?.type}</p>

          {session ? (
            <button
              onClick={() => signOut()}
              className="px-10 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-700 text-white"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={handleNavigation}
              className="px-10 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-700 text-white"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
