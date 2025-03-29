'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

export default function InstructorClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [bookings, setBookings] = useState<{ [key: string]: any[] }>({})
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const fetchInstructorData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setAccessDenied(true)
        return
      }

      // Fetch profile to check role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('user_id', user.id)
        .single()

      if (error || !profile || profile.role !== 'instructor') {
        setAccessDenied(true)
        return
      }

      // Fetch classes where this instructor is the teacher
      const { data: instructorClasses } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher', profile.full_name)

      setClasses(instructorClasses || [])

      // Fetch bookings for each class
      const bookingsMap: { [key: string]: any[] } = {}

      for (let cls of instructorClasses || []) {
        const { data: clsBookings } = await supabase
          .from('bookings')
          .select('user_name, booked_at, mode')
          .eq('class_id', cls.id)

        bookingsMap[cls.id] = clsBookings || []
      }

      setBookings(bookingsMap)
      setLoading(false)
    }

    fetchInstructorData()
  }, [])

  const handleZoomLinkUpdate = async (classId: string, link: string) => {
    const { error } = await supabase
      .from('classes')
      .update({ meeting_link: link })
      .eq('id', classId)

    if (error) {
      alert('Failed to save link: ' + error.message)
    } else {
      alert('Zoom link saved successfully!')
    }
  }

  if (accessDenied) {
    return <div className="text-center mt-10 text-red-500 text-lg font-semibold">Access Denied: Instructors Only</div>
  }

  if (loading) {
    return <div className="text-center mt-10">Loading instructor classes...</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">Instructor Dashboard</h1>

      <Link href="/" className="text-blue-600 underline">← Back to Home</Link>

      {classes.length === 0 ? (
        <p className="text-center text-gray-600">You have no scheduled classes.</p>
      ) : (
        classes.map(cls => (
          <div key={cls.id} className="border rounded-xl p-6 shadow-md bg-white">
            <h2 className="text-xl font-semibold text-purple-800">{cls.title}</h2>
            <p><strong>Date:</strong> {cls.date}</p>
            <p><strong>Time:</strong> {cls.time}</p>
            <p><strong>Style:</strong> {cls.style}</p>

            <div className="mt-4">
              <h3 className="text-md font-semibold">🧘 Booked Participants:</h3>
              {bookings[cls.id]?.length === 0 ? (
                <p className="text-gray-500">No bookings yet.</p>
              ) : (
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  {bookings[cls.id].map((b, idx) => (
                    <li key={idx}>
                      {b.user_name} — {b.mode} ({new Date(b.booked_at).toLocaleString()})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ✅ Zoom Link Input */}
            <div className="mt-4">
              <h3 className="font-semibold mb-1">📹 Add or Update Zoom Link:</h3>
              <input
                type="text"
                placeholder="https://zoom.us/..."
                value={cls.tempLink ?? cls.meeting_link ?? ''}
                onChange={(e) => {
                  const updated = classes.map(c => {
                    if (c.id === cls.id) {
                      return { ...c, tempLink: e.target.value }
                    }
                    return c
                  })
                  setClasses(updated)
                }}
                className="w-full px-3 py-2 border rounded-md mb-2"
              />
              <button
                onClick={() => handleZoomLinkUpdate(cls.id, cls.tempLink ?? cls.meeting_link ?? '')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save Link
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}