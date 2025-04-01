'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { FaCartArrowDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Event } from '@/app/DisplayEventList/DisplayEventListComponents/ShowEventListCard';

export default function ShowEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const formatToLongDate = (dateString) => {
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
        const res = await fetch(`http://localhost:1818/events/${eventId}`, { method: 'GET' })
        if (!res.ok) {
          throw new Error('Event not found !')
        }

        const data = await res.json()
        console.log(data);
        setEvent(data[0])

      } catch (error) {
        setError(error.message)
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

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
    <div className='min-h-screen flex flex-col bg-white'>
      <div className='flex-1 bg-[#0a1128] flex flex-col lg:flex-row items-center p-8 gap-8'>
        <div className="relative w-full lg:w-1/2 h-[400px]">
          <Image
            src='/cardImage/pexels-johannes-havn-835931-2417730.jpg'
            alt={event.title}
            fill
            className='object-cover rounded-xl shadow-2xl'
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

      <div className='flex p-8 max-w-4xl mx-auto w-full'>
        <div className='flex md:flex-row-reverse gap-7 space-y-8'>
          <div className='w-1/2'>
            <p className='text-gray-700 text-lg leading-relaxed italic md:w-xl'>
              "{event.description}"
            </p>

            <div className='flex items-center gap-2'>
              <svg className="w-5 h-5 text-[#009de0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className='text-lg font-medium'>{event.location}</span>
            </div>
          </div>


          <div className='w-1/2'>
            <button
              onClick={() => router.push("/login")}
              className="cursor-pointer mt-8 flex items-center gap-3 bg-[#0a1128] hover:bg-green-800 text-white py-4 px-8 
            rounded-full font-medium transition-all duration-300 group">
              <FaCartArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className='tracking-wider'>RESERVE YOUR PLACE</span>
            </button></div>

        </div>
      </div>
    </div>
  )
}