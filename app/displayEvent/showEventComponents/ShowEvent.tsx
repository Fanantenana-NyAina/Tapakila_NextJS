'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { FaCartArrowDown } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5"
import { Event } from '@/app/DisplayEventList/DisplayEventListComponents/ShowEventListCard';

interface ticketItem {
  type_of_ticket: string,
  price: number
}

export default function ShowEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  const formatToLongDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return date.toLocaleDateString('en-EN', options);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:1818/events/${eventId}`);
        if (!res.ok) {
          throw new Error('Event not found!');
        }

        const data = await res.json();
        if (data.length === 0) {
          throw new Error('Event not found!');
        }

        const eventDetails = {
          id: data[0].id,
          title: data[0].title,
          date_of_event: data[0].date_of_event,
          categorie: data[0].categorie,
          description: data[0].description,
          location: data[0].location,
        };

        const tickets: ticketItem = data.map((item: ticketItem) => ({
          type_of_ticket: item.type_of_ticket,
          price: item.price,
        }));

        setEvent({ ...eventDetails, tickets });

      } catch (error) {
        setError(error.message);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);


  if (error) {
    return <p>{error}</p>
  }



  if (!event) {
    return (
      <div className='mt-44 flex flex-col justify-center items-center '>
        <ClipLoader color='#009de0'
          size={80} />
        <p className='text-[#009de0] mt-4 font-mono'>Loading please wait....</p>
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col bg-white'>
      <div className='relative flex-1 bg-[#0a1128] flex flex-col lg:flex-row items-center p-8 gap-8'>
        <button
          onClick={handleBackClick}
          aria-label="Back"
          className="absolute bottom-8 right-11 lg:right-12 lg:top-8 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors h-fit"
        >
          <IoArrowBack size={24} className="text-white hover:text-[#009de0]" />
        </button>
        <div className="relative w-full lg:w-1/2 h-[400px]">
          <Image
            src='/cardImage/pexels-johannes-havn-835931-2417730.jpg'
            alt={event.title}
            fill
            className='object-cover rounded-4xl shadow-2xl'
            priority
          />
        </div>

        <div className='text-white w-full lg:w-1/2 space-y-6'>
          <h1 className='text-4xl font-bold tracking-tight'>{event.title}</h1>

          <div className="space-y-4">
            <div className='flex items-start gap-3'>
              <span className='text-[#009de0] font-bold min-w-[50px]'>ON:</span>
              <p className="text-xl">{formatToLongDate(event.date_of_event)}</p>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-[#009de0] font-bold min-w-[50px]'>VIBE:</span>
              <p className="text-xl">{event.categorie}</p>
            </div>
          </div>

          <div className='mt-6'>
            <span className='inline-block border-2 border-[#009de0] text-[#009de0] px-4 py-2 rounded-full text-sm font-medium tracking-wider'>
              DON'T MISS OUT !
            </span>
          </div>
        </div>
      </div>

      <div className='flex p-8 w-full justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full md:flex-row-reverse md:gap-44 space-y-8'>
          <div className='md:w-[50%]'>
            <p className='text-gray-700 text-lg leading-relaxed italic'>
              ```{event.description}```
            </p>

            <div className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-[#009de0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className='text-lg font-medium'>{event.location}</span>
            </div>
          </div>


          <div className='sm:w-full md:w-[50%] flex flex-col gap-2'>
            <h2 className='font-bold text-xl underline'>Available Tickets:</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Price ($)</th>
                    <th className="px-4 py-2 border">Reserve</th>
                  </tr>
                </thead>
                <tbody>
                  {event.tickets.map((ticket: ticketItem, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border text-center">{ticket.type_of_ticket}</td>
                      <td className="px-4 py-2 border text-center">{ticket.price}</td>
                      <td className="px-4 py-2 border flex justify-center items-center">
                        <button
                          onClick={() => router.push("/login")}
                          className="cursor-pointer flex items-center text-[#0a1128] hover:text-green-800
            rounded-full font-medium transition-all">
                          <FaCartArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}