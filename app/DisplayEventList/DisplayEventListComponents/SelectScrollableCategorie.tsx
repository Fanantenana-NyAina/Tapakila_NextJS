'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from 'react'

interface Event {
    id: string
    categorie: string
}

interface SelectScrollableProps {
    onCategoryChange: (category: string) => void
}

export default function SelectScrollable({ onCategoryChange }: SelectScrollableProps) {
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:1818/events")
                if (!res.ok) throw new Error("Failed to fetch events")
                const data: Event[] = await res.json()

                const uniqueCategories: string[] = [];

                for (const event of data) {
                    if (event.categorie && !uniqueCategories.includes(event.categorie)) {
                        uniqueCategories.push(event.categorie);
                    }
                }

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Fetch error:", error)
            }
        }

        fetchCategories();
    }, []);


    return (
        <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/10 text-white border border-transparent hover:border-white/30">
                <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}