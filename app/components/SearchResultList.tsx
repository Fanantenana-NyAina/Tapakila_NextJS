import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

export default function SearchResultList({ results }: { results: any[] }) {
    const [showResults, setShowResults] = useState<boolean>(false);

    useEffect(() => {
        if (results.length > 0) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [results]);

    if (!showResults) return null;

    return (
        <div
            className={`absolute bottom-2 bg-white h-44 w-96 flex flex-col items-start overflow-y-scroll max-h-96 border shadow-md rounded-md ${showResults ? "animate-fadeIn" : "animate-fadeOut"
                }`}
        >
            {results.map((result, id) => (
                <SearchResult key={id} result={result} />
            ))}
        </div>
    );
}
