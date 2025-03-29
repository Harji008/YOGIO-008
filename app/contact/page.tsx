'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('contact_messages').insert([{
      name: form.name,
      email: form.email,
      message: form.message,
    }])

    if (error) {
      alert('Submission failed: ' + error.message)
    } else {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">📬 Contact Us</h1>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you! Whether you have questions, suggestions, or feedback — feel free to reach out.
        </p>

        {submitted ? (
          <div className="text-center text-green-600 font-semibold">
            ✅ Thank you! Your message has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  )
}