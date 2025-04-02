'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoArrowBack, IoSearch, IoClose } from "react-icons/io5"
import { FiUser } from "react-icons/fi"
import SearchBar from '@/app/components/SearchBar'
import SelectScrollable from './SelectScrollableCategorie'
import { DatePickerWithRange } from './DatePickerWithRange'
import { DateRange } from 'react-day-picker'
import SelectScrollableLocation from './SelectScrollableLocation'

interface ShowEventListHeaderProps {
    onCategoryChange: (category: string) => void
    onDateRangeChange: (range: DateRange | undefined) => void
    onLocationChange: (location: string) => void
}

export default function ShowEventListHeader({ onCategoryChange, onDateRangeChange, onLocationChange }: ShowEventListHeaderProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    const handleConnexionClick = () => {
        router.push("/login")
    }

    const handleBackClick = () => {
        router.back()
    }

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch)
    }

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
                        <SearchBar />
                        <SelectScrollable onCategoryChange={onCategoryChange} />
                        <DatePickerWithRange onDateRangeChange={onDateRangeChange} />
                        <SelectScrollableLocation onLocationChange={onLocationChange} />

                    </div>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleMobileSearch}
                        aria-label="Search"
                        className="p-2 rounded-full hover:bg-white/10"
                    >
                        {showMobileSearch ? <IoClose size={24} /> : <IoSearch size={24} />}
                    </button>

                    <button
                        onClick={handleConnexionClick}
                        className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-950"
                    >
                        <FiUser size={18} />
                    </button>
                </div>

                <div className="hidden md:block">
                    <button
                        onClick={handleConnexionClick}
                        className="flex items-center gap-2 px-4 py-2 text-center text-white border border-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all"
                    >
                        <FiUser size={18} />
                        <span>Connexion</span>
                    </button>
                </div>
            </nav>

            {showMobileSearch && (
                <div className="md:hidden px-4 pb-3 animate-fade-in">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IoSearch className="text-gray-400" size={18} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009de0]"
                            autoFocus
                        />
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