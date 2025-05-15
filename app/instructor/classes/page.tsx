'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

export default function InstructorClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [bookings, setBookings] = useState<{ [key: string]: any[] }>({})
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    available_slots: '',
    duration: '90 minutes',
    style: 'Yoga',
    meeting_link: '',
  })

  useEffect(() => {
    const fetchInstructorData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setAccessDenied(true)
        return
      }

      // Fetch profile to check role and name
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('user_id', user.id)
        .single()

      if (error || !profileData || profileData.role !== 'instructor') {
        setAccessDenied(true)
        return
      }

      setProfile(profileData)

      // Fetch instructor's own classes
      const { data: instructorClasses } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher', profileData.full_name)

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
      window.location.reload()
    }
  }

  const handleCancelClass = async (classId: string, classTitle: string) => {
    const confirmed = confirm('Are you sure you want to cancel this class? All booked participants will be notified.');
    if (!confirmed) return;
  
    // 1. Update class to mark as canceled
    const { error: cancelError } = await supabase
      .from('classes')
      .update({
        is_canceled: true,
        cancellation_reason: 'Canceled by instructor',
        canceled_at: new Date().toISOString()
      })
      .eq('id', classId);
  
    if (cancelError) {
      alert('Error canceling class: ' + cancelError.message);
      return;
    }
  
    





    // 2. Get all booked participants for this class
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('user_id')
      .eq('class_id', classId);
  
    if (bookingsError) {
      alert('Class canceled, but failed to fetch bookings: ' + bookingsError.message);
      return;
    }
  
    if (bookingsData && bookingsData.length > 0) {
      // 3. Insert notifications for booked users
      const notifications = bookingsData.map(b => ({
        user_id: b.user_id,
        message: `The class "${classTitle}" you booked has been canceled by the instructor.`,
      }));
  
      const { error: notifyError } = await supabase
        .from('notifications')
        .insert(notifications);
  
      if (notifyError) {
        alert('Class canceled, but failed to notify users: ' + notifyError.message);
      } else {
        alert('Class canceled and participants have been notified!');
        window.location.reload(); // Refresh the page to update the view
      }
    } else {
      alert('Class canceled. No participants were booked.');
      window.location.reload();
    }
  };
  
  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    const { error } = await supabase.from('classes').insert([
      {
        ...newClass,
        available_slots: parseInt(newClass.available_slots),
        teacher: profile.full_name,
      },
    ])

    if (error) {
      alert('Error adding class: ' + error.message)
    } else {
      alert('Class added successfully!')
      setNewClass({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        available_slots: '',
        duration: '90 minutes',
        style: 'Yoga',
        meeting_link: '',
      })
      window.location.reload()
    }
  }


  const handleSendSMS = async () => {
    try {
      const res = await fetch('/api/send-sms');
      const result = await res.json();
      alert(result.message || 'SMS notifications sent!');
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS notifications.');
    }
  };
  

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




      <div className="flex justify-end mb-6">
  <button
    onClick={handleSendSMS}
    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg shadow transition"
  >
    📤 Send SMS to Students
  </button>
</div>

      {/* ✅ Add New Class Form */}
      <div className="border rounded-xl p-6 shadow-md bg-white mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Add New Class</h2>
        <form onSubmit={handleAddClass} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Class Title"
            value={newClass.title}
            onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newClass.description}
            onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="date"
            value={newClass.date}
            onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="time"
            name="time"
            value={newClass.time}
            onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newClass.location}
            onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="available_slots"
            placeholder="Available Slots"
            value={newClass.available_slots}
            onChange={(e) => setNewClass({ ...newClass, available_slots: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="meeting_link"
            placeholder="Zoom Link (optional)"
            value={newClass.meeting_link}
            onChange={(e) => setNewClass({ ...newClass, meeting_link: e.target.value })}
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
            Add Class
          </button>


          
        </form>
      </div>


     






      {/* ✅ List of Existing Classes */}
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
            <button
                onClick={() => handleCancelClass(cls.id, cls.title)}
                 disabled={cls.is_canceled}
                 className={`${
                 cls.is_canceled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                  } text-white px-4 py-2 rounded-md mt-4`}
                    >
                  {cls.is_canceled ? 'Class Canceled' : 'Cancel Class'}
              </button>

              <div className="text-center mt-6">
  <a
    href="/feedback"
    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
  >
    View Student Feedback
  </a>
</div>


          </div>
        ))
      )}
    </div>
  )
}