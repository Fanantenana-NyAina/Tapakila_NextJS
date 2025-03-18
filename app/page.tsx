'use client'

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResultList from './components/SearchResultList';

export default function Home() {
  const [results, setResults] = useState([])

  return (
    <div className="hero-section flex flex-col justify-center items-center py-16 md:py-44 z-50 h-full pb-48 bg-cover bg-center">
      <div className="flex flex-col justify-center items-center text-center w-full md:w-3xl px-4 md:px-0">
        <h1 className="text-4xl sm:text-5xl font-bold font-stretch-expanded mb-3.5 text-white">
          Welcome to <span className="text-[#009de0]">tapakila</span>
        </h1>
        <p className="font-mono mb-4 text-xl sm:text-base md:text-lg text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
          deleniti voluptatibus eaque cupiditate maxime tenetur fugiat
          laboriosam ipsum aut, quisquam dolores? Perferendis delectus expedita
          excepturi impedit explicabo rem ipsa ipsam!
        </p>
      </div>
      <div className='relative w-full max-w-md'>
        <SearchBar setResults={setResults} />
        <SearchResultList results={results} />
      </div>
    </div>
  );
}
