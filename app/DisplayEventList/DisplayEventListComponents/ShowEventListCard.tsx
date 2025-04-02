'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

export interface Event {
    id: string
    title: string
    categorie: string
    date_of_event: string
    location: string
    description: string
    available_of_ticket: string
    imgUrl?: string
}

interface ShowEventListCardProps {
    selectedCategory?: string
    dateRange?: DateRange
    selectedLocation?: string

}

export default function ShowEventListCard({ selectedCategory = 'all', dateRange, selectedLocation = 'everywhere' }: ShowEventListCardProps) {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:1818/events")

                if (!res.ok) throw new Error("Failed to fetch events")

                const data = await res.json()
                setEvents(data)
            } catch (error) {
                console.error("Fetch error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    // useEffect(() => {
    //     setFilteredEvents(
    //         selectedCategory === 'all'
    //             ? events
    //             : events.filter(event => {
    //                 const category = event.categorie.toLowerCase();
    //                 return category === selectedCategory.toLowerCase();
    //             })
    //     );
    // }, [selectedCategory, events]);

    useEffect(() => {
        const filterEvent = () => {
            const filtering = events.filter(event => {
                const categoryMatch = selectedCategory === 'all' || event.categorie.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()

                let dateMatch = true;
                if (dateRange?.from && dateRange?.to) {
                    const eventDate = new Date(event.date_of_event)

                    if (eventDate < dateRange.from || eventDate > dateRange.to) {
                        dateMatch = false
                    }
                }

                const locationMatch = selectedLocation == 'everywhere' || event.location.toLocaleLowerCase() === selectedLocation?.toLocaleLowerCase()

                return categoryMatch && dateMatch && locationMatch

            })

            return filtering
        }

        setFilteredEvents(filterEvent())
    }, [dateRange, selectedCategory, events, selectedLocation])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (filteredEvents.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                    {selectedCategory === 'all' || selectedLocation === 'everywhere' ? 'No events available' : `No events found in ${selectedCategory} category` || `No events found in ${selectedCategory}`}
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-12">
                <span className='animate-pulse text-6xl'>🎉</span>
                {selectedCategory === 'all' && selectedLocation === 'everywhere'
                    ? 'All upcoming events'
                    : selectedCategory !== 'all' && selectedLocation === 'everywhere'
                        ? `Events in ${selectedCategory}`
                        : selectedCategory === 'all' && selectedLocation !== 'everywhere'
                            ? `Events at ${selectedLocation}`
                            : `Events in ${selectedCategory} at ${selectedLocation}`}
                <span className='animate-pulse text-6xl'>🎉</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 w-full">
                            <Image
                                src={event.imgUrl || '/cardImage/pexels-johannes-havn-835931-2417730.jpg'}
                                alt={event.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <span className="text-white font-semibold">
                                    {new Date(event.date_of_event).toLocaleDateString('en-EN')}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h2>
                            <p className="text-gray-700 mb-6 line-clamp-3">{event.description}</p>
                            <p>{event.location}</p>
                            <button
                                className="px-4 py-2 bg-[#009de0] text-white rounded-lg hover:bg-green-900 transition-colors"
                                onClick={() => router.push("/login")}
                            >
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
