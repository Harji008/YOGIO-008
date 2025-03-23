'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [userId, setUserId] = useState('')
  const [profile, setProfile] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [goals, setGoals] = useState('')
  const [experience, setExperience] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setProfile(data)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!userId) {
      alert('User is not logged in.')
      return
    }
  
    const { error } = await supabase.from('profiles').insert([
      {
        user_id: userId,
        full_name: fullName,
        bio,
        goals,
        experience,
      },
    ])
  
    if (error) {
      alert('Error saving profile: ' + error.message)
    } else {
      alert('Profile saved!')
      router.push('/')
    }
  }
  // If profile already exists, display it
  if (profile) {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p><strong>Full Name:</strong> {profile.full_name}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>Goals:</strong> {profile.goals}</p>
        <p><strong>Experience:</strong> {profile.experience}</p>
      </div>
    )
  }

  // Else, show profile creation form
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio"
          className="w-full p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Goals"
          className="w-full p-2 border rounded"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Experience"
          className="w-full p-2 border rounded"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}