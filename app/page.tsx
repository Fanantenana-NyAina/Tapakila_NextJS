'use client'

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResultList from './components/SearchResultList';
import ActiveSlider from "./components/ActiveSlider";

export interface SearchResultType {
  id: number
  name: string
  email: string
}

export default function Home() {
  const [results, setResults] = useState<SearchResultType[]>([])

  return (
    <>
      <div className="hero-section flex flex-col justify-center items-center py-16 md:py-44 z-50 h-full pb-48 bg-cover bg-center">
        <div className="flex flex-col justify-center items-center text-center w-full md:w-3xl px-4 md:px-0">
          <h1 className="text-4xl sm:text-5xl font-bold font-stretch-expanded mb-3.5 text-white">
            Welcome to <span className="text-[#009de0]">tapakila</span>
          </h1>
          <p className="font-mono mb-4 text-xl sm:text-base md:text-lg text-white">
            Your go-to platform for purchasing tickets to the best events. Discover upcoming concerts, shows, 
            and exclusive experiences—all in one place. With <span className="text-[#009de0] font-bold text-xl">Tapakila</span>, 
            buying tickets is quick, easy, and secure. Don t miss out on your next adventure—grab your tickets now!
          </p>
        </div>
        <div className='relative w-full max-w-md'>
          <SearchBar setResults={setResults} />
          <SearchResultList results={results} />
        </div>
      </div>

      {/*event card section*/}
      <div className="w-full h-screen">
        <ActiveSlider />
      </div>
    </>
  );
}
