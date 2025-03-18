export default function SearchResultList({ results }: { results: any[] }) {
    if (results.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 bg-white max-h-44 overflow-y-auto 
                       border border-[#009de0]/30 shadow-lg rounded-lg mt-2 z-10">
            {results.map((result, id) => (
                <div key={id} className="px-4 py-2.5 hover:bg-slate-50 transition-colors duration-200 
                                      cursor-pointer border-b border-gray-100 last:border-b-0">
                    {result.name}
                </div>
            ))}
        </div>
    );
}