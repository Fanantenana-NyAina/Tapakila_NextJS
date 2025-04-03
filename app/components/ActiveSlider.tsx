import { Swiper, SwiperSlide } from "swiper/react";
import { LuTicketCheck } from "react-icons/lu";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { Event } from "../DisplayEventList/DisplayEventListComponents/ShowEventListCard";

export default function ActiveSlider() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:1818/events", { method: 'GET' });
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-full w-full bg-[#0a1128] py-12">
      {/* Header Section */}
      <div className="text-white text-center max-w-4xl px-4 mt-6 mb-5">
        <h1 className="font-bold text-3xl lg:text-4xl mb-2">
          Upcoming <span className="text-[#009de0]">Events</span> -{" "}
          <span className="underline">Don’t Miss Out!</span>
        </h1>
        <p className="text-lg text-white">
          Get ready for unforgettable moments, amazing performances, and an electrifying atmosphere.
          Secure your ticket now and be part of the excitement!
        </p>
      </div>

      {/* Events Slider */}
      <div className="relative w-full max-w-6xl">
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full px-12"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="flex flex-col h-full mx-2">
                <div
                  onClick={() => router.push(`/displayEvent/${event.id}`)}
                  className="group relative flex-1 shadow-lg text-white rounded-xl overflow-hidden cursor-pointer min-h-[400px]">
                  {/* Event Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.img})` }}
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Event Content */}
                  <div className="relative h-full flex flex-col p-6">
                    <div className="flex-grow flex flex-col justify-center items-start">
                      <h2 className="text-xl md:text-2xl font-bold mb-3 bg-[#009de0b0] h-12 w-fit px-4 py-1 rounded-2xl">{event.title}</h2>
                      <p className="text-xl md:text-base">{event.description}</p>
                    </div>

                    {/* Button */}
                    <div className="absolute bottom-0 top-80 right-6">
                      <button
                        className="cursor-pointer flex items-center gap-2 bg-[#009de0] text-white py-2 px-4 rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all"
                      >
                        <span>About it</span>
                        <LuTicketCheck className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-[#009de0] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-blue-950 transition-all"
        >
          <IoIosArrowRoundBack size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-[#009de0] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-blue-950 transition-all"
        >
          <IoIosArrowRoundForward size={24} />
        </button>
      </div>
    </div>
  );
}