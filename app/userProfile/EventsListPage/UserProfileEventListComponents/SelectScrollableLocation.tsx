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
    location: string
}

interface SelectScrollableLocationProps {
    onLocationChange: (location: string) => void
}

export default function SelectScrollableLocation({ onLocationChange }: SelectScrollableLocationProps) {
    const [location, setlocation] = useState<string[]>([])
    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const res = await fetch("http://localhost:1818/events")
                if (!res.ok) throw new Error("Failed to fetch events")
                const data: Event[] = await res.json()

                const uniqueLocation: string[] = [];

                for (const event of data) {
                    if (event.location && !uniqueLocation.includes(event.location)) {
                        uniqueLocation.push(event.location);
                    }
                }

                setlocation(uniqueLocation);
            } catch (error) {
                console.error("Fetch error:", error)
            }
        }

        fetchlocation();
    }, []);


    return (
        <Select onValueChange={onLocationChange}>
            <SelectTrigger className="h-80 rounded-l-none rounded-r-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009de0] border border-transparent hover:border-white/30 transition-all">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="everywhere">All location</SelectItem>
                {location.map((loc, index) => (
                    <SelectItem key={index} value={loc}>
                        {loc}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}