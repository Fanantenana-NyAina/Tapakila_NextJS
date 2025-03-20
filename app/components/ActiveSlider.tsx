import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { data } from "../mockData";

export default function ActiveSlider() {
  return (
    <div className="flex items-center justify-center flex-col h-full w-full bg-[#0a1128]">
      <div className="text-white flex flex-col justify-center items-center text-center w-3xl mt-6 mb-5">
        <h1 className="font-bold text-3xl mb-2">Upcoming
          <span className="text-[#009de0]"> Events</span> <span> - </span>
          <span className="underline underline-offset-2">Don’t Miss Out!</span></h1>
        <p className="font-mono mb-4 text-xl sm:text-base md:text-lg text-white">The biggest events are just around the corner!
          Get ready for unforgettable moments, amazing performances,
          and an electrifying atmosphere. Secure your ticket now and be part of the excitement!</p>
      </div>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="mx-8">
            <div
              className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white 
              rounded-xl px-6 py-8 h-96 w-40 lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <h1 className="text-xl lg:text-3xl bg-[#009de0b0] font-bold h-13 flex justify-start items-center pl-4 w-60 rounded-3xl">
                  {item.concert} </h1>
                <p className="lg:text-[18px]">{item.review} </p>
                <div className="flex justify-end items-center">
                  <button className="w-fit px-5 py-2 bg-[#009de0] text-white rounded-full font-medium hover:bg-white hover:text-blue-950 transition-all">show</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
