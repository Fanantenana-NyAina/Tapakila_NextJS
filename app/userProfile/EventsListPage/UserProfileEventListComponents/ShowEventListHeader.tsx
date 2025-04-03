'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoArrowBack, IoSearch, IoClose } from "react-icons/io5"
import { FiUser } from "react-icons/fi"
import SearchBar from '@/app/components/SearchBar'
import SelectScrollable from './SelectScrollableCategorie'
import { DatePickerWithRange } from './DatePickerWithRange'
import { DateRange } from 'react-day-picker'
import SelectScrollableLocation from './SelectScrollableLocation'
import { SearchResultType } from '@/app/components/Interface'
import SearchResultList from '@/app/components/SearchResultList'

interface ShowEventListHeaderProps {
    onCategoryChange: (category: string) => void
    onDateRangeChange: (range: DateRange | undefined) => void
    onLocationChange: (location: string) => void
}

export default function ShowEventListHeader({ onCategoryChange, onDateRangeChange, onLocationChange }: ShowEventListHeaderProps) {
    const router = useRouter()
    const [showMobileSearch, setShowMobileSearch] = useState(false)
    const [results, setResults] = useState<SearchResultType[]>([])
    const [username, setUsername] = useState('');
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const handleBackClick = () => {
        router.back()
    }

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch)
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

    return (
        <header className="w-full text-white bg-[#0a1128] shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                <button
                    onClick={handleBackClick}
                    aria-label="Back"
                    className="cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <IoArrowBack size={24} className="text-white hover:text-[#009de0]" />
                </button>

                <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoSearch className="text-gray-400" size={18} />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className="flex-1 relative">
                            <SearchBar setResults={setResults} />
                            <SearchResultList results={results} />
                        </div>
                        <SelectScrollable onCategoryChange={onCategoryChange} />
                        <DatePickerWithRange onDateRangeChange={onDateRangeChange} />
                        <SelectScrollableLocation onLocationChange={onLocationChange} />
                    </div>
                </div>


                <div className='flex justify-center items-center gap-2'>
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleMobileSearch}
                            aria-label="Search"
                            className="p-2 rounded-full hover:bg-white/10"
                        >
                            {showMobileSearch ? <IoClose size={24} /> : <IoSearch size={24} />}
                        </button>
                    </div>

                    <button
                        onClick={handleProfileClick}
                        className="p-2 rounded-full hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                    >
                        <FiUser size={20} />
                        {!isLoading && username && (
                            <span className="text-sm truncate max-w-[80px]">{username}</span>
                        )}
                    </button>
                </div>

            </nav>


            {isOpenProfileMenu && (
                <div className="fixed inset-0 z-[1000]">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsOpenProfileMenu(false)}
                    />
                    <div className="absolute top-16 right-4 bg-white rounded-lg p-5 z-[1001] w-64 shadow-lg">
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

            {showMobileSearch && (
                <div className="md:hidden px-4 pb-3 animate-fade-in">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IoSearch className="text-gray-400" size={18} />
                        </div>
                        <div className="flex-1 relative">
                            <SearchBar setResults={setResults} />
                            <SearchResultList results={results} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <SelectScrollable onCategoryChange={onCategoryChange} />
                        <DatePickerWithRange onDateRangeChange={onDateRangeChange} />
                        <SelectScrollableLocation onLocationChange={onLocationChange} />
                    </div>
                </div>
            )}
        </header>
    )
}