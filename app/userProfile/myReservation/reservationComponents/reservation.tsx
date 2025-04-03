'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { FiUser } from "react-icons/fi"

export default function Reservation() {
    const { userId } = useParams()
    const router = useRouter()
    const [username, setUsername] = useState<string>('');
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [reservations, setReservation] = useState()

    const handleBackClick = () => {
        router.back()
    }

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
                    console.log("Nom d'utilisateur récupéré :", storedUsername);
                    setUsername(storedUsername);
                }

                setIsLoading(false)
            } catch (error) {
                console.error("Authentication error:", error);
                router.replace("/error");
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchReservationList = async () => {
            try {
                const res = await fetch(`http://localhost:1818/reservation/list/${userId}`)
                if (!res.ok) {
                    throw new Error('Event not found!');
                }

                const data = await res.json();
                if (data.length === 0) {
                    throw new Error('Event not found!');
                }

                setReservation(data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchReservationList()
    })

    return (
        <div>
            <header className='w-full text-white bg-[#0a1128] shadow-lg sticky top-0 z-50'>
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                    <button
                        onClick={handleBackClick}
                        aria-label="Back"
                        className="cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <IoArrowBack size={24} className="text-white hover:text-[#009de0]" />
                    </button>

                    <button
                        onClick={handleProfileClick}
                        className="p-2 rounded-full hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                    >
                        <FiUser size={20} />
                        {!isLoading && username && (
                            <span className="text-sm truncate max-w-[80px]">{username}</span>
                        )}
                    </button>
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
            </header>
            <div>
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border">Event name</th>
                            <th className="px-4 py-2 border">Ticket number(s)</th>
                            <th className="px-4 py-2 border">Reservation date</th>
                            <th className="px-4 py-2 border">Total prayed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2 border text-center">AZHJKE</td>
                            <td className="px-4 py-2 border text-center">sgkjdqhklqj</td>
                            <td className="px-4 py-2 border text-center">dshkqjsdhk</td>
                            <td className="px-4 py-2 border text-center">hkjfjkdljsq</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
