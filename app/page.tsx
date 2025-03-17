import { FaSearch } from "react-icons/fa";

export default function Home() {
  const url: string = "https://jsonplaceholder.typicode.com/";

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
      <div className="relative flex items-center justify-center gap-3 w-full max-w-md px-4 mt-4">
        <FaSearch className="absolute left-7 text-gray-500" />
        <input
          type="text"
          placeholder="Search Event"
          className="w-full py-2 pl-10 pr-4 rounded-xl border-2 bg-slate-50 border-[#009de0] focus:bg-slate-100 focus:outline-[#0a1128]"
        />
      </div>
    </div>
  );
}
