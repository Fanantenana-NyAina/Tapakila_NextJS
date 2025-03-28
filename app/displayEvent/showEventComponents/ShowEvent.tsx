'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ShowEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null)
  const [error, setError] = useState("")

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

    if(eventId) {
      fetchEvent()
    }
  }, [eventId])

  if(error) {
    return <p>{error}</p>
  }

  if(!event) {
    return <p>loading.....</p>
  }

  return (
    <div>
      <div className='relative top bg-[#0a1128] h-[50%] w-full'>
        
      </div>
      <div className='bottom h-screen w-full'></div>
    </div>
  )
}