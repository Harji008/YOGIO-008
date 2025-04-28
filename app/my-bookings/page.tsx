'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

interface ClassInfo {
  title: string
  date: string
  time: string
  teacher: string
  meeting_link?: string
}

interface Booking {
  id: string
  class_id: string
  booked_at: string
  mode: string
  classes: ClassInfo | null
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userName, setUserName] = useState('')
  const [feedback, setFeedback] = useState('')         // Feedback text
  const [rating, setRating] = useState<number | null>(null)  // Feedback rating

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('Please log in')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single()

      setUserName(profile?.full_name || '')

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
        const safeData = data?.map((booking: any) => ({
          ...booking,
          classes: Array.isArray(booking.classes) ? booking.classes[0] : booking.classes
        })) || []

        setBookings(safeData)
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

  const handleSubmitFeedback = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Please log in')
      return
    }

    if (!feedback || rating === null) {
      alert('Please provide both rating and comment!')
      return
    }

    const { error } = await supabase
      .from('feedback')
      .insert([{ user_id: user.id, rating, comment: feedback }])

    if (error) {
      alert('Error submitting feedback: ' + error.message)
    } else {
      alert('Thank you for your feedback!')
      setFeedback('')
      setRating(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-800">🧘 YOGIO</h1>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-black hover:underline">🏠 Home</Link>
          <Link href="/classes" className="text-gray-700 hover:text-black hover:underline">📅 View YOGIO Schedule</Link>
        </div>
      </nav>

      <h2 className="text-2xl font-bold text-center mb-2">
        Hello {userName} <span className="inline-block">🧘</span>
      </h2>
      <h3 className="text-xl text-center mb-6 font-semibold">Your Booked Classes</h3>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You haven't booked any classes yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              {booking.classes && (
                <>
                  <h3 className="text-xl font-semibold text-purple-800 mb-1">{booking.classes.title}</h3>
                  <p><strong>Date:</strong> {booking.classes.date}</p>
                  <p><strong>Time:</strong> {booking.classes.time}</p>
                  <p><strong>Teacher:</strong> {booking.classes.teacher}</p>

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
                </>
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

      {/* ✅ Feedback Section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">📝 We’d love your feedback!</h3>
        <div className="space-y-4 max-w-md mx-auto">
          <label className="block text-lg font-medium text-gray-700">
            Your Rating (1-5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating || ''}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border mt-2 px-4 py-2 w-full rounded-md"
              placeholder="Enter rating between 1-5"
            />
          </label>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback here..."
            className="border px-4 py-2 w-full rounded-md"
            rows={4}
          />

          <button
            onClick={handleSubmitFeedback}
            className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  )
}