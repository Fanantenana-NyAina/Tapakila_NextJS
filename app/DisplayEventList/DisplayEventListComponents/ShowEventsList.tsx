'use client'
import React, { useState } from 'react'
import ShowEventListHeader from './ShowEventListHeader'
import ShowEventListCard from './ShowEventListCard'

export default function ShowEventsList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    return (
        <div>
            <ShowEventListHeader onCategoryChange={setSelectedCategory} />
            <ShowEventListCard selectedCategory={selectedCategory} />
        </div>
    )
}
