"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResultType } from "./Interface";

export default function SearchBar({ setResults }: { setResults: (results: SearchResultType[]) => SearchResultType }) {
    const [input, setInput] = useState<string>("");

    const backendURL: string = "http://localhost:1818/events";

    const fetchData = async (value: string) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        try {
            const response = await fetch(backendURL, { method: 'GET' });
            const json = await response.json();

            const res = json.filter((data: { categorie: string }) =>
                data.categorie.toLowerCase().includes(value.toLowerCase())
            );

            setResults(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (value: string) => {
        setInput(value);

        if (!value.trim()) {
            setResults([]);
            return;
        }

        setTimeout(() => {
            fetchData(value);
        }, 300);
    };

    return (
        <div className="relative flex items-center w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
                type="text"
                placeholder="Searching for an event ?"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009de0] border border-transparent hover:border-white/30 transition-all"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}