"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/Contact" },
    { title: "About", path: "/About" },
    { title: "Dash", path: "/Dash" },
  ];

  const handleNavigation = () => router.push("/api/auth/signin");
  const handleSignUp = () => router.push("/api/auth/signup");

  return (
    <div className={`navbar bg-purple-500`}>
      <div className="navbar max-w-[1200px] mx-auto">
        {/* Navbar Start */}
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
                {links.map((link) => (
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
          <Link href="/" className="font-bold text-3xl text-red-400">
            Next <span className="text-blue-400">Hero</span>
          </Link>
        </div>

        {/* Navbar Middle */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className={`px-4 py-2 text-black font-semibold  ${
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
        <div className="navbar-end">
          {session?.user?.image || session?.user?.imageUrl ? (
            <Image
              src={session?.user?.image || session?.user?.imageUrl}
              alt={session?.user?.name || "User Avatar"}
              width={30}
              height={30}
              className=" mr-5"
            />
          ) : (
            <></>
          )}
          <div className="text-center mr-5">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.type}</p>
          </div>

          {session ? (
            <button
              onClick={() => signOut()}
              className="px-10 py-3 rounded-full font-semibold bg-red-500 hover:bg-red-700 text-white"
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                onClick={handleSignUp}
                className="px-10 py-3 border-2 border-red-700 font-semibold bg-red-500 hover:bg-red-700 text-white"
              >
                Sign Up
              </button>
              <button
                onClick={handleNavigation}
                className="px-10 py-3 border-2 border-red-700 font-semibold bg-red-500 hover:bg-red-700 text-white"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
