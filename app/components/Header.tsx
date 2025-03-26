"use client";

import Link from "next/link";
import Image from "next/image";
import { IoMenuSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MenyItem = "Home" | "Events" | "About" | "Contact"

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isScrolled, setIsSrolled] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSrolled(true)
      } else {
        setIsSrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  const menuItems: MenyItem[] = ["Home", "Events", "About", "Contact"]

  const handleConnexionClick = () => {
    router.push("/login")
  }

  return (
    <header className="w-full text-white">
      <nav className={`w-full flex justify-between items-center py-3 px-6 md:px-16 fixed z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0a1128]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
          <Link href="/" className="flex items-center text-white hover:opacity-90 transition-opacity">
            <Image src="/ETicket_Logo.svg" alt="logo" width={40} height={30} />
            <span className="text-2xl font-semibold">Tapakila</span>
          </Link>
        </div>

        <div className="flex items-center gap-9 ml-auto">
          <ul className="hidden xl:flex items-center gap-9 font-medium text-base">
            {menuItems.map((item) => (
              <li key={item} className="relative cursor-pointer transition-all 
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                before:bg-blue-400 before:transition-all before:duration-300 before:content-[''] 
                hover:before:w-full">
                <Link href={`#${item.toLowerCase()}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-4">
            <button onClick={(e) => {
              e.preventDefault()
              handleConnexionClick()
            }} className="cursor-pointer px-5 py-2 border border-[#009de0] text-[#58d0fc] rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all">
              Connexion
            </button>
            <Link
              href="/recent_event"
              className="px-5 py-2 bg-[#009de0] text-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all">
              New coming event ✨
            </Link>
          </div>

          <IoMenuSharp className="size-8 xl:hidden block cursor-pointer text-white" onClick={() => setOpenMenu(!openMenu)} />
        </div>
      </nav>

      {openMenu && (
        <nav className="fixed top-0 left-0 right-0 bottom-0 bg-[#0a1128] z-50">
          <div className="flex justify-between items-center py-3 px-6 md:px-16 border-b border-blue-900">
            <div className="text-2xl text-white hover:opacity-90 transition-opacity">
              <Link href="/" className="flex items-center text-white hover:opacity-90 transition-opacity">
                <Image src="/ETicket_Logo.svg" alt="logo" width={40} height={30} />
                <span className="font-bold">Tapakila</span>
              </Link>
            </div>
            <IoMenuSharp className="size-8 cursor-pointer text-white" onClick={() => setOpenMenu(false)} />
          </div>

          <div className="flex flex-col items-center pt-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-").replace("à", "a")}`}
                className="w-full text-center py-4 text-xl relative cursor-pointer transition-all 
                  before:absolute before:bottom-0 before:left-1/4 before:w-0 before:h-[2px] 
                  before:bg-blue-400 before:transition-all before:duration-300 before:content-[''] 
                  hover:before:w-1/2"
                onClick={() => setOpenMenu(false)}
              >
                {item}
              </Link>
            ))}

            <div className="w-full flex flex-col items-center gap-4 mt-8">
              <button
                className="px-5 py-2 text-center text-white border border-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all"
                onClick={(e) => {
                  e.preventDefault()
                  setOpenMenu(false)
                  handleConnexionClick()
                }}
              >
                Connexion
              </button>
              <Link
                href="/recent_event"
                className="px-5 py-2 bg-[#009de0] text-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all">
                New coming event ✨
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
