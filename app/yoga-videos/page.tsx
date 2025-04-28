// app/yoga-videos/page.tsx
"use client";

import Header from "../components/Header";

const poses = [
  { title: "Awkward Pose", file: "Awkward Vid 2025.mov", orientation: "vertical" },
  { title: "Balancing Stick Pose", file: "Balancing Stick Video 2025.mov", orientation: "vertical" },

  { title: "Eagle Pose", file: "Eagle Video 2025.mov", orientation: "vertical" },



  { title: "Half Moon Pose", file: "Half Moon Vid 2025.mov", orientation: "vertical" },
  { title: "Standing Head to Knee Pose", file: "Standing Head to Knee Video 2025.mov", orientation: "vertical" },


  { title: "Standing Separate Leg Stretching Pose", file: "Standing Separate Leg Stretching Video 2025.mov", orientation: "vertical" },
  { title: "Standing Separate Leg Head to Knee Pose", file: "Standing Separate Leg Head to Knee Video 2025.mov", orientation: "vertical" },
  { title: "Tree Pose and Toe Stand", file: "Tree Pose and Toe Stand Video 2025.mov", orientation: "vertical" },

  { title: "Camel Pose", file: "Camel Video 2025.mov", orientation: "vertical" },

  
  { title: "Triangle Pose", file: "Triangle Video 2025.mov", orientation: "horizontal" },
  { title: "Wind Removing Pose", file: "Wind Removing Video 2025.mov", orientation: "horizontal" },
  { title: "Cobra Pose", file: "Cobra Video 2025.mov", orientation: "horizontal" },



  { title: "Half Tortoise Pose", file: "Half Tortoise Video 2025.mov", orientation: "horizontal" },
  { title: "Locust Pose", file: "Locust Video 2025.mov", orientation: "horizontal" },
  { title: "Pranayama", file: "Pranayama 2025 vid.mov", orientation: "horizontal" },
  { title: "Rabbit Pose", file: "Rabbit Video 2025.mov", orientation: "horizontal" },
  { title: "Savasana", file: "Savasana Video 2025.mov", orientation: "horizontal" },
  { title: "Separate Leg Stretching Pose", file: "Separate Leg with Stretching Video 2025.mov", orientation: "horizontal" },

  
  { title: "Fixed Firm Pose", file: "Fixed Firm Video 2025.mov", orientation: "horizontal" },
  { title: "Floor Bow Pose", file: "Floor Bow Video 2025.mov", orientation: "horizontal" },
 
  { title: "Sit-Up Pose", file: "Sit-Up Video 2025.mov", orientation: "horizontal" },

  { title: "Spine Twisting Pose", file: "Spine Twist Video 2025.mov", orientation: "horizontal" },
  { title: "Final Breathing", file: "Final Breathing Video 2025.mov", orientation: "horizontal" },


];

export default function YogaVideosPage() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">
          🎥 Explore Yoga Videos
        </h1>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          Discover pose-by-pose breakdowns and full 90-minute Bikram Yoga sessions led by our experienced instructors.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🧘 26&2 Pose Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {poses.map((pose, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <video
                  controls
                  className={`w-full ${
                    pose.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"
                  } object-contain`}
                >
                  <source src={`/videos/${pose.file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{pose.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}