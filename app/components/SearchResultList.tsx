import SearchResult from "./SearchResult";

export default function SearchResultList({ results }: { results: any[] }) {
    if (results.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 bg-white max-h-44 overflow-y-auto 
                       border border-[#009de0]/30 shadow-lg rounded-lg mt-2 z-10">
            {results.map((result, id) => (
                <SearchResult key={id} result={result} />
            ))}
        </div>
    );
}