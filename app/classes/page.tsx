'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface ClassItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  teacher: string
  available_slots: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingStatus, setBookingStatus] = useState('')

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from('classes').select('*')
      if (data) setClasses(data)
      if (error) console.error('Error fetching classes:', error)
      setLoading(false)
    }

    fetchClasses()
  }, [])

  const handleBooking = async (classId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Please log in to book a class.')
      return
    }

    const { error } = await supabase.from('bookings').insert([
      {
        user_id: user.id,
        class_id: classId,
      },
    ])

    if (error) {
      setBookingStatus('Failed to book: ' + error.message)
    } else {
      setBookingStatus('Class booked successfully!')
    }
  }

  if (loading) return <p className="p-6">Loading classes...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Yoga Classes</h1>
      {bookingStatus && <p className="mb-4 text-green-500">{bookingStatus}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="border border-gray-300 p-4 rounded-lg bg-white text-black shadow"
          >
            <h2 className="text-xl font-semibold">{classItem.title}</h2>
            <p>{classItem.description}</p>
            <p>
              <strong>Date:</strong> {classItem.date}
            </p>
            <p>
              <strong>Time:</strong> {classItem.time}
            </p>
            <p>
              <strong>Teacher:</strong> {classItem.teacher}
            </p>
            <p>
              <strong>Slots:</strong> {classItem.available_slots}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleBooking(classItem.id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}