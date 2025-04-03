"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

type MenuItem = "Events" | "My_Profile" | "My_Reservation";

export default function UserProfileHeader() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
                if (!token) {
                    alert("Veuillez vous connecter pour accéder à cette page");
                    router.push("/login");
                    return;
                }

                const storedUsername = localStorage.getItem("username");
                if (storedUsername) {
                    setUsername(storedUsername);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                router.replace("/error");
            }
        };

        checkAuth();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [router]);

    const menuItems: MenuItem[] = ["Events", "My_Profile", "My_Reservation"];

    const handleProfileClick = () => {
        setIsOpenProfileMenu(!isOpenProfileMenu);
    };

    const handleChangeAccount = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.push("/login");
        setIsOpenProfileMenu(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.push("/");
        setIsOpenProfileMenu(false);
    };

    return (
        <header className="w-full text-black">
            <nav
                className={`h-14 w-full flex justify-between items-center py-3 px-6 md:px-16 fixed z-50 transition-colors duration-300 ${isScrolled ? "bg-[#0a1128]" : "bg-transparent"
                    }`}
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Image
                        src="/ETicket_Logo.svg"
                        alt="Tapakila Logo"
                        width={40}
                        height={30}
                    />
                    <span className="text-2xl font-semibold">Tapakila</span>
                </Link>

                <div className="flex items-center gap-9 ml-auto">
                    <ul className="hidden xl:flex items-center gap-9 font-medium text-base">
                        {menuItems.map((item) => (
                            <li
                                key={item}
                                className="relative cursor-pointer transition-all 
                  before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                  before:bg-blue-400 before:transition-all before:duration-300 hover:before:w-full"
                            >
                                <Link href={item.toLowerCase() == "events" ? `/userProfile/EventsListPage` : `#${item.toLowerCase()}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>

                    {username && (
                        <div className="hidden md:flex gap-4">
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center gap-2 px-4 py-2 border border-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all"
                            >
                                <FiUser size={18} />
                                {username}
                            </button>
                        </div>
                    )}

                    <IoMenuSharp
                        className="size-8 xl:hidden cursor-pointer"
                        onClick={() => setOpenMenu(true)}
                    />
                </div>
            </nav>

            {isOpenProfileMenu && (
                <div className="fixed inset-0 z-[1000]">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsOpenProfileMenu(false)}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5 z-[1001] w-64 shadow-lg">
                        <div className="pb-3 mb-3 border-b border-gray-200 text-center">
                            <h3 className="font-medium text-gray-800">Mon Compte</h3>
                        </div>
                        <button
                            onClick={handleChangeAccount}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                            Changer de compte
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            )}

            {openMenu && (
                <div className="fixed inset-0 bg-[#0a1128] z-50">
                    <div className="flex justify-between items-center py-3 px-6 md:px-16 border-b border-blue-900">
                        <Link
                            href="/"
                            className="flex items-center hover:opacity-90 transition-opacity"
                        >
                            <Image
                                src="/ETicket_Logo.svg"
                                alt="Tapakila Logo"
                                width={40}
                                height={30}
                            />
                            <span className="font-bold">Tapakila</span>
                        </Link>
                        <IoMenuSharp
                            className="size-8 cursor-pointer"
                            onClick={() => setOpenMenu(false)}
                        />
                    </div>

                    <div className="flex flex-col items-center pt-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="w-full text-center py-4 text-xl relative cursor-pointer transition-all 
                  before:absolute before:bottom-0 before:left-1/4 before:w-0 before:h-[2px] 
                  before:bg-blue-400 before:transition-all before:duration-300 hover:before:w-1/2"
                                onClick={() => setOpenMenu(false)}
                            >
                                {item}
                            </Link>
                        ))}

                        {username && (
                            <div className="w-full flex flex-col items-center gap-4 mt-8">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 border border-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all"
                                >
                                    <FiUser size={18} />
                                    {username}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}