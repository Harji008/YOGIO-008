'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

interface Booking {
  id: string
  class_id: string
  booked_at: string
  mode: string
  classes: {
    title: string
    date: string
    time: string
    teacher: string
    meeting_link?: string
  }[];
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('Please log in')
        return
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single()

      setUserName(profile?.full_name || '')

      // Fetch bookings with class info including meeting_link
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          class_id,
          booked_at,
          mode,
          classes (
            title,
            date,
            time,
            teacher,
            meeting_link
          )
        `)
        .eq('user_id', user.id)
        .order('booked_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
      } else {
        setBookings(data)
      }
    }

    fetchBookings()
  }, [])

  const handleCancel = async (bookingId: string) => {
    const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
    if (error) {
      alert('Failed to cancel booking')
    } else {
      setBookings(bookings.filter(b => b.id !== bookingId))
    }
  }

  const handleBooking = async (classId: string, mode: 'in-person' | 'livestream') => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      alert('Please sign in to book a class.')
      return
    }

    // Fetch full name from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError.message)
      alert('Could not fetch user profile.')
      return
    }

    const fullName = profile?.full_name || 'Unknown'

    // Insert booking including user_name
    const { data: bookingData, error: insertError } = await supabase.from('bookings').insert([
      {
        user_id: user.id,
        class_id: classId,
        booked_at: new Date().toISOString(),
        mode,
        user_name: fullName,
      },
    ])

    console.log('Insert Result:', bookingData, insertError)

    if (insertError) {
      alert('Booking failed: ' + insertError.message)
    } else {
      alert(`Successfully booked your ${mode} class!`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* ✅ Navigation Header */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-800">🧘 YOGIO</h1>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-black hover:underline">🏠 Home</Link>
          <Link href="/classes" className="text-gray-700 hover:text-black hover:underline">📅 View YOGIO Schedule</Link>
        </div>
      </nav>

      {/* 👋 Greeting */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Hello {userName} <span className="inline-block">🧘</span>
      </h2>
      <h3 className="text-xl text-center mb-6 font-semibold">Your Booked Classes</h3>

      {/* Booked Class Cards */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You haven't booked any classes yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-1">{booking.classes.title}</h3>
              <p><strong>Date:</strong> {booking.classes.date}</p>
              <p><strong>Time:</strong> {booking.classes.time}</p>
              <p><strong>Teacher:</strong> {booking.classes.teacher}</p>

              {/* ✅ Show Zoom Link */}
              {booking.classes.meeting_link && (
                <p>
                  <strong>Join Zoom:</strong>{' '}
                  <a
                    href={booking.classes.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Join Class
                  </a>
                </p>
              )}

              <p><strong>Mode:</strong> {booking.mode === 'in-person' ? 'In-Person' : 'Livestream'}</p>
              <p className="text-sm text-gray-500 mt-1">
                <em>Booked At:</em> {new Date(booking.booked_at).toLocaleString()}
              </p>
              <button
                onClick={() => handleCancel(booking.id)}
                className="mt-4 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
