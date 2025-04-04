'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { FaCartArrowDown } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5"

interface Ticket {
  type_of_ticket: string
  price: number
}

interface Event {
  id: string
  title: string
  date_of_event: string
  categorie: string
  description: string
  location: string
  img: string
  tickets: Ticket[]
}

export default function ShowEvent() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { eventId } = useParams()

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
    const fetchData = async () => {
      try {
        setLoading(true)

        const eventRes = await fetch(`http://localhost:1818/events/${eventId}`)
        if (!eventRes.ok) throw new Error('Failed to fetch event')

        const ticketsRes = await fetch(`http://localhost:1818/tickets/event/${eventId}`)
        if (!ticketsRes.ok) throw new Error('Failed to fetch tickets')

        const eventData = await eventRes.json()
        const ticketsData = await ticketsRes.json()

        setEvent({
          ...eventData,
          tickets: ticketsData
        })

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [eventId])

  if (loading) {
    return (
      <div className='mt-44 flex flex-col justify-center items-center '>
        <ClipLoader color='#009de0'
          size={80} />
        <p className='text-[#009de0] mt-4 font-mono'>Loading please wait....</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg">Event not found</p>
      </div>
    )
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
            src={event.img}
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
                  {event.tickets.map((ticket, index) => (
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