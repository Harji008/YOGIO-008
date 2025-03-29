'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Header() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', user.id)
          .single()

        if (profile?.full_name) {
          setUserName(profile.full_name)
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <header className="w-full p-4 flex justify-between items-center bg-black bg-opacity-90 z-50">
      <h1 className="text-3xl font-bold tracking-wide px-6 text-white">YOGIO</h1>

      <Link href="/instructor/classes" className="text-blue-400 hover:underline">
        👩‍🏫 Instructor Dashboard
      </Link>

      <nav className="space-x-6 px-6 flex items-center">
        <Link href="/classes" className="text-gray-300 hover:text-white">Yoga Classes</Link>
        <a href="#" className="text-gray-300 hover:text-white">Yoga Videos</a>
         <a href="#" className="text-gray-300 hover:text-white">Courses</a>
        <Link href="/instructors" className="text-gray-300 hover:text-white">Our Teachers</Link>
        <a href="#" className="text-gray-300 hover:text-white">Contact</a>

        {userName ? (
          <>
            <span className="text-green-300 font-medium mr-4">Welcome, {userName}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = '/'
              }}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-red-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <button className="px-4 py-2 text-white bg-transparent border border-gray-300 rounded-lg">
                Sign in
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Register
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}