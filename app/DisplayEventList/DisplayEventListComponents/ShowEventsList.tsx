'use client'
import React, { useState } from 'react'
import ShowEventListHeader from './ShowEventListHeader'
import ShowEventListCard from './ShowEventListCard'
import { DateRange } from "react-day-picker"

export default function ShowEventsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

    return (
        <div>
            <ShowEventListHeader
                onCategoryChange={setSelectedCategory}
                onDateRangeChange={setDateRange}
            />
            <ShowEventListCard
                selectedCategory={selectedCategory}
                dateRange={dateRange} />
        </div>
    )
}
