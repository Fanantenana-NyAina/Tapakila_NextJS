'use client'

// import { useState } from "react";
import ActiveSlider from "./ActiveSlider";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/navigation";

export interface SearchResultType {
  id: number
  name: string
  email: string
}

export default function Page() {
  // const [results, setResults] = useState<SearchResultType[]>([])
  const router = useRouter()

  const handleClick = () => {
    router.push("/DisplayEventList")
  }

  return (
    <>
      <Header />
      {/*Home section*/}
      <div id="home" className="hero-section flex flex-col justify-center items-center py-16 md:py-44 z-50 h-full pb-48 bg-cover bg-center">
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
        <div className='flex justify-center items-center w-full max-w-md h-14'>
          <button onClick={(e) => {
            e.preventDefault()
            handleClick()
          }} className="cursor-pointer px-5 border h-14 border-[#009de0] bg-[#009de0] text-white rounded-full font-medium hover:bg-white hover:text-blue-950 hover:border-none transition-all">
            All Coming events <span className="">✨</span>
          </button>
        </div>
      </div>

      {/*event card section*/}
      <div id="events" className="w-full h-screen">
        <ActiveSlider />
      </div>
      
      {/* footer section */}
      <Footer />
    </>
  );
}
