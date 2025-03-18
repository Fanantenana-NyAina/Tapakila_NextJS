"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ setResults }: { setResults: (results: any[]) => void }) {
    const [input, setInput] = useState<string>("");

    const url: string = "https://jsonplaceholder.typicode.com/users";

    const fetchData = async (value: string) => {
        if (!value.trim()) {
            setResults([]); // Hide results when input is empty
            return;
        }

        try {
            const response = await fetch(url);
            const json = await response.json();

            const res = json.filter((data: { name: string }) =>
                data.name.toLowerCase().includes(value.toLowerCase())
            );

            setResults(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = (value: string) => {
        setInput(value);

        if (!value.trim()) {
            setResults([]); // Hide list when clearing input
            return;
        }

        setTimeout(() => {
            fetchData(value);
        }, 300); // Debounced API call
    };

    return (
        <div className="relative flex items-center justify-center gap-3 w-full max-w-md px-4 mt-4">
            <FaSearch className="absolute left-7 text-gray-500" />
            <input
                type="text"
                placeholder="Search Event"
                className="w-full py-2 pl-10 pr-4 rounded-xl border-2 bg-slate-50 border-[#009de0] focus:bg-slate-100 focus:outline-[#0a1128]"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}
