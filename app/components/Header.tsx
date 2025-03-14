"use client";

import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="flex justify-between items-center text-black py-2 px-4 md:px-32 bg-white drop-shadow-md relative">
      <Link href="/" className="font-bold text-lg hover:scale-105 transition-transform">
        E-Tapakila
      </Link>

      <ul className="hidden xl:flex items-center gap-9 font-semibold text-base">
        {["Home", "Event", "About"].map((item) => (
          <li key={item} className="p-2 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
            {item}
          </li>
        ))}
      </ul>

      <div className="relative hidden md:flex items-center gap-3">
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search Event"
          className="py-2 pl-10 pr-4 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
        />
      </div>

      <div className="hidden md:flex gap-3">
        <Link href="/login" className="px-4 py-2 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300 transition-all">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-all">
          Sign Up
        </Link>
      </div>

      <IoMenuSharp className="size-9 xl:hidden block cursor-pointer" onClick={() => setOpenMenu(!openMenu)} />

      {openMenu && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-center gap-7 font-semibold text-lg bg-white shadow-md py-5">
          {["Home", "Event", "About"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="p-2 hover:bg-sky-400 hover:text-white rounded-md w-full text-center transition-all">
              {item}
            </Link>
          ))}
          
          <Link href="/" className="p-2 bg-gray-200 text-black rounded-md w-full text-center hover:bg-gray-300 transition-all">
            Login
          </Link>
          <Link href="/" className="p-2 bg-sky-500 text-white rounded-md w-full text-center hover:bg-sky-600 transition-all">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
