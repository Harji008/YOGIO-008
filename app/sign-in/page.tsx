'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

const [resetEmail, setResetEmail] = useState('');
const [resetMessage, setResetMessage] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert('Sign in successful!')
      router.push('/')
    }
  }

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }
  
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
  
    if (error) {
      setResetMessage(error.message);
    } else {
      setResetMessage("Check your email for the password reset link!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignIn} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

<div className="mt-4">
  <label className="block mb-1 text-sm">Forgot Password?</label>
  <input
    type="email"
    placeholder="Enter your email"
    value={resetEmail}
    onChange={(e) => setResetEmail(e.target.value)}
    className="w-full p-2 border rounded mb-2 text-black"
  />
  <button
    onClick={handleResetPassword}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Send Reset Link
  </button>
  {resetMessage && <p className="mt-2 text-sm text-yellow-300">{resetMessage}</p>}
</div>


        <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Sign In
        </button>
        <p className="mt-4 text-center">
          Don’t have an account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </form>
    </div>

    
  )
}