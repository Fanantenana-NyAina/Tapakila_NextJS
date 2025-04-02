'use client'
import React, { useState } from 'react'
import ShowEventListHeader from './ShowEventListHeader'
import ShowEventListCard from './ShowEventListCard'
import { DateRange } from "react-day-picker"

export default function ShowEventsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
    const [selectedLocation, setSelectedLocation] = useState<string>("everywhere")

    return (
        <div className='bg-amber-50'>
            <ShowEventListHeader
                onCategoryChange={setSelectedCategory}
                onDateRangeChange={setDateRange}
                onLocationChange={setSelectedLocation}
            />
            <ShowEventListCard
                selectedCategory={selectedCategory}
                dateRange={dateRange}
                selectedLocation={selectedLocation} />
        </div>
    )
}
