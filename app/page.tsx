'use client'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
 
 

export default function Home() {

  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

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
    <div className="h-screen flex items-center text-white relative">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/yoga-background.jpg"
          alt="Yoga Background"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-10">
        <h1 className="text-3xl font-bold tracking-wide px-6">YOGIO</h1>

        <Link href="/instructor/classes" className="text-blue-600 hover:underline">
  👩‍🏫 Instructor Dashboard
</Link>


        <nav className="space-x-6 px-6 flex items-center">
        <Link href="/classes" className="text-gray-300 hover:text-white">Yoga Classes</Link>          
        <a href="/yoga-videos" className="text-gray-300 hover:text-white">Yoga Videos</a>
        <Link href="/courses" className="text-gray-300 hover:text-white">Courses</Link>
          <Link href="/instructors" className="text-gray-300 hover:text-white">Our Teachers</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          

          {/* Conditional Welcome */}
         {/* {userName ? (
            <span className="text-green-300 font-medium">Welcome, {userName}</span>
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
          )} */}


{userName ? (
  <>
    <span className="text-green-300 font-medium mr-4">Welcome, {userName}</span>
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        window.location.href = '/' // ✅ redirect to landing page
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

      {/* Hero Section (Left-Aligned Text) */}
      <div className="ml-20 max-w-xl z-10">
        <h2 className="text-5xl font-bold">Yoga for everyone</h2>
        <p className="mt-3 text-lg">
          Enjoy personalized yoga & wellness to fit your lifestyle.
        </p>
        <div className="mt-6 flex gap-4">
        <Link href="/classes">
  <button className="px-6 py-3 bg-black text-white border border-white rounded-lg text-lg hover:bg-white hover:text-black transition">
    View Live Classes Schedule
  </button>
</Link>
          <Link href="/register">
  <button className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition">
    New Student Special – $79 
  </button>
</Link>
        </div>
        <p className="mt-6 text-gray-300">
          Experience the best in yoga, meditation, Pilates, and fitness with world-class
          instructors anywhere you want and whenever you want.
        </p>
      </div>
    </div>
  )
}