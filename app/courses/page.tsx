// app/courses/page.tsx
"use client";

import Header from "../components/Header";
import YogaGallery from "../components/YogaGallery";

export default function CoursesPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-4">
          🧘 Our Course Options
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
          Choose the plan that fits your lifestyle. Whether you're just starting or want unlimited access, we’ve got you covered!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Drop-In Option */}
          <div className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">$39 Drop-In</h2>
            <p className="text-gray-600 mb-4">
              Join us for just one class in our state-of-the-art studio with knowledgeable teachers.
            </p>
            <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition w-full">
              Join Now
            </button>
          </div>

          {/* Unlimited Option */}
          <div className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">$179 Unlimited*</h2>
            <p className="text-gray-600 mb-4">
              Enjoy unlimited classes in the studio or virtually. 30-day notice to cancel. Auto Pay Monthly Unlimited.
            </p>
            <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition w-full">
              Join Now
            </button>
          </div>
        </div>

        {/* ✅ Only one Yoga Gallery */}
       
      </div>
    </>
  );
}