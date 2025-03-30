'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

type YogaClass = {
  id: string;
  title: string;
  style: string;
  date: string;
  time: string;
  teacher: string;
  slots: number;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<YogaClass[]>([])
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('date', selectedDate)

      if (error) {
        console.error(error)
      } else {
        setClasses(data as YogaClass[])
      }
    }

    fetchClasses()
  }, [selectedDate])

  const daysToShow = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  const handleBooking = async (classId: string, mode: 'in-person' | 'livestream') => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      alert('Please sign in to book a class.')
      return
    }

    // 🔍 Get user's full name from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError.message)
      alert('Could not fetch your profile.')
      return
    }

    const fullName = profile?.full_name || 'Unknown'

    // ✅ Insert booking with user_name
    const { error: insertError } = await supabase.from('bookings').insert([
      {
        user_id: user.id,
        class_id: classId,
        booked_at: new Date().toISOString(),
        mode,
        user_name: fullName, // ✅ This shows in Supabase!
      },
    ])

    if (insertError) {
      alert('Booking failed: ' + insertError.message)
    } else {
      alert(`Successfully booked ${mode === 'in-person' ? 'an in-person' : 'a livestream'} class!`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">

      {/* 🚀 Navigation Header */}
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">YOGIO Schedule</h1>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-black hover:underline">🏠 Home</Link>
          <Link href="/my-bookings" className="text-gray-700 hover:text-black hover:underline">🧘 My Bookings</Link>
        </div>
      </nav>

      {/* Date Tabs */}
      <div className="flex justify-center space-x-3 mb-8">
        {daysToShow.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedDate === day ? 'bg-black text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {new Date(day).toDateString().slice(0, 10)}
          </button>
        ))}
      </div>

      {/* In-Person / Livestream Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">In-Person</button>
        <button className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">Livestream</button>
      </div>

      {/* Class Listings */}
      {classes.length === 0 ? (
        <p className="text-center text-gray-600">No classes scheduled for this day.</p>
      ) : (
        <div className="space-y-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-purple-800">{cls.title}</h2>
                  <p className="text-sm text-gray-600">{cls.style}</p>
                  <p><strong>Date:</strong> {cls.date}</p>
                  <p><strong>Time:</strong> {cls.time}</p>
                  <p><strong>Teacher:</strong> {cls.teacher}</p>
                  <p><strong>Slots:</strong> {cls.slots}</p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
                  <button
                    onClick={() => handleBooking(cls.id, 'in-person')}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                  >
                    Book In-Person
                  </button>
                  <button
                    onClick={() => handleBooking(cls.id, 'livestream')}
                    className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-md transition"
                  >
                    Book Livestream
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}