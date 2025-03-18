import React from 'react'

export default function SearchResult({ result }) {
    return (
        <div className="px-4 py-2.5 hover:bg-slate-50 transition-colors duration-200 
            cursor-pointer border-b border-gray-100 last:border-b-0">
            {result.name}
        </div>
    )
}
