"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {SearchResultType } from "./Interface";

export default function SearchBar({ setResults }: { setResults: (results: SearchResultType[]) => SearchResultType }) {
    const [input, setInput] = useState<string>("");

    const url: string = "https://jsonplaceholder.typicode.com/users";

    const fetchData = async (value: string) => {
        if (!value.trim()) {
            setResults([]);
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
                placeholder="Search Event"
                className="w-full py-2 pl-10 pr-4 rounded-xl border-2 bg-slate-50 border-[#009de0] focus:bg-slate-100 focus:outline-[#0a1128]"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}