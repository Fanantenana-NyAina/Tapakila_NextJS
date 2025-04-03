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
    }, [router]);

    const menuItems: MenuItem[] = ["My_Profile", "My_Reservation", "Events"];

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
        <div>
            <header className="w-full text-white font-mono">
                <nav
                    className={`h-14 w-full flex justify-between items-center py-3 px-6 md:px-16 fixed z-50 transition-colors duration-300 bg-[#0a1128] `}
                >
                    <Link
                        href=""
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
                                    <Link href={
                                        item.toLowerCase() === "events" ? `/userprofile/EventsListPage` :
                                            item.toLowerCase() === "my_reservation" ? `/userprofile/myReservation` :
                                                `#${item.toLowerCase()}`
                                    }>
                                        {item}
                                    </Link>
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
            <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="relative w-11/12 sm:w-96 bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
                    <div className="h-28 bg-gradient-to-r from-[#27a8df] to-[#0a80b2] relative">
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-md flex items-center">
                            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                            ACTIF
                        </div>
                    </div>

                    <div className="flex justify-center -mt-12">
                        <Image
                            src="/ETicket_Logo.svg"
                            alt="Tapakila Logo"
                            width={100}
                            height={30}
                            className="z-50 w-40 h-40 rounded-full border-4 border-white bg-gradient-to-br
                         from-blue-400 to-indigo-500 shadow-lg flex items-center justify-center text-4xl text-white font-bold"
                        />
                    </div>

                    <div className="px-6 pb-8 text-center mt-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Hello, {username.toUpperCase()}!</h1>
                        <p className="text-blue-500 text-sm mb-6">Bienvenue dans votre espace personnel</p>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                            <p className="text-gray-600 text-sm">
                                Profil actif et engagé. Prêt à découvrir de nouvelles expériences et à partager des moments uniques.
                            </p>
                        </div>
                    </div>

                    <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20"></div>
                </div>
            </div>
        </div>

    );
}
