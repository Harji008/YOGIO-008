// app/instructors/page.tsx
"use client";

import { useState } from "react";
import Header from '../components/Header'
import { Home } from "lucide-react";
import Link from "next/link";

export default function InstructorsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpanded(expanded === name ? null : name);
  };
  return (

    
    <div className="max-w-5xl mx-auto px-4 py-10">
        
        <div className="flex justify-end px-6 mt-4">
  <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
    🏠 Home
  </Link>
</div>


      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">
        🧘‍♀️ Meet Our Instructors
      </h1>
      <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        At YOGIO, our instructors are more than just teachers – they are compassionate,
        experienced guides who are dedicated to helping you grow in your yoga journey.
        Each brings their own style, background, and story to create a supportive and
        empowering experience for every student.
      </p>

      <div className="space-y-4">
        {/* Instructor: Lynne Farrell */}
        <div className="border rounded-md overflow-hidden shadow">
          <button
            className="w-full text-left px-6 py-4 bg-purple-100 hover:bg-purple-200 font-semibold text-lg flex justify-between items-center"
            onClick={() => toggleExpand("Lynne Farrell")}
          >
            <span>{expanded === "Lynne Farrell" ? "−" : "+"} Lynne Farrell</span>
          </button>
          {expanded === "Lynne Farrell" && (
            <div className="px-6 py-6 bg-white text-gray-700 grid md:grid-cols-3 gap-6 items-start">
              <img src="/lynne.jpg" alt="Lynne Farrell" className="w-full h-auto rounded-xl shadow-md" />
              <div className="md:col-span-2 space-y-4">
                <p>In 2006, Lynne had just gotten out of a long-term relationship and was looking for a new workout. She discovered Bikram Yoga, which soon became her everything — her exercise, hobby, support, and passion.</p>
                <p>In 2007, she traveled to Hawaii for 9 weeks of teacher training. Although she feared public speaking, she completed the training. Since then, she's taught for 13+ years and continues to learn.</p>
                <p>As a massage therapist since 2001, she’s helped countless people. As a yoga teacher, she’s touched even more lives through healing and empowerment.</p>
                <p>In 2017, Lynne opened Hot Yoga Baltimore. Managing the studio through the pandemic taught her resilience, patience, and that yoga — like life — offers gifts when embraced with an open heart.</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructor: Christina Martin */}
        <div className="border rounded-md overflow-hidden shadow">
          <button
            className="w-full text-left px-6 py-4 bg-purple-100 hover:bg-purple-200 font-semibold text-lg flex justify-between items-center"
            onClick={() => toggleExpand("Christina Martin")}
          >
            <span>{expanded === "Christina Martin" ? "−" : "+"} Christina Martin</span>
          </button>
          {expanded === "Christina Martin" && (
            <div className="px-6 py-6 bg-white text-gray-700 grid md:grid-cols-3 gap-6 items-start">
              <img src="/ins1.jpg" alt="Christina Martin" className="w-full h-auto rounded-xl shadow-md" />
              <div className="md:col-span-2 space-y-4">
                <p>Christina is from Lancaster, PA, and now resides in Maryland. She started Bikram hot yoga (26&2) in 2012 and completed her 200-hour YTT in 2019.</p>
                <p>Her journey into yoga began for physical health but evolved into joining a supportive community. She is certified in 26&2, Yin (Yin96), pyroPilates, and Mindful Resilience Training (MRT).</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructor: Erin Rathbone */}
        <div className="border rounded-md overflow-hidden shadow">
          <button
            className="w-full text-left px-6 py-4 bg-purple-100 hover:bg-purple-200 font-semibold text-lg flex justify-between items-center"
            onClick={() => toggleExpand("Erin Rathbone")}
          >
            <span>{expanded === "Erin Rathbone" ? "−" : "+"} Erin Rathbone</span>
          </button>
          {expanded === "Erin Rathbone" && (
            <div className="px-6 py-6 bg-white text-gray-700 grid md:grid-cols-3 gap-6 items-start">
              <img src="/ins2.jpg" alt="Erin Rathbone" className="w-full h-auto rounded-xl shadow-md" />
              <div className="md:col-span-2 space-y-4">
                <p>Erin began the 26&2 series in 2010 and quickly turned it into a lifelong practice. Her passion lies in both the mental and physical elements of yoga.</p>
                <p>She earned her 200-hour teacher training in 2020 and has trained under renowned instructors like Jared McCann, Benjamin Sears, and Esak Garcia. Erin also practices Vinyasa and Forrest Yoga.</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructor: Carmen Miles Davis */}
        <div className="border rounded-md overflow-hidden shadow">
          <button
            className="w-full text-left px-6 py-4 bg-purple-100 hover:bg-purple-200 font-semibold text-lg flex justify-between items-center"
            onClick={() => toggleExpand("Carmen Miles Davis")}
          >
            <span>{expanded === "Carmen Miles Davis" ? "−" : "+"} Carmen Miles Davis</span>
          </button>
          {expanded === "Carmen Miles Davis" && (
            <div className="px-6 py-6 bg-white text-gray-700 grid md:grid-cols-3 gap-6 items-start">
              <img src="/ins4.jpg" alt="Carmen Miles Davis" className="w-full h-auto rounded-xl shadow-md" />
              <div className="md:col-span-2 space-y-4">
                <p>Carmen teaches through the lens of strength, breath, and mindfulness. Her yoga classes help students ground themselves and grow physically and emotionally.</p>
                <p>She brings experience in holistic wellness and community teaching to foster inner peace, resilience, and personal transformation.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}