// app/yoga-videos/page.tsx
"use client";

import Header from "../components/Header";

export default function YogaVideosPage() {
  const poses = [
    {
      title: "Standing Deep Breathing",
      benefit: "Improves lung capacity and oxygen intake, calms the nervous system."
    },
    {
      title: "Half Moon Pose",
      benefit: "Strengthens core muscles, stretches spine and improves posture."
    },
    {
      title: "Awkward Pose",
      benefit: "Strengthens legs and improves balance and circulation."
    },
    {
      title: "Eagle Pose",
      benefit: "Improves balance, stretches shoulders, strengthens ankles and knees."
    },
    {
      title: "Standing Head to Knee Pose",
      benefit: "Builds mental focus, strengthens legs and tones the abdominal area."
    },
    {
      title: "Standing Bow Pulling Pose",
      benefit: "Enhances flexibility, balance, and cardiovascular circulation."
    },
    {
      title: "Balancing Stick Pose",
      benefit: "Increases heart rate and builds body symmetry."
    },
    {
      title: "Standing Separate Leg Stretching Pose",
      benefit: "Stretches hamstrings, spine and improves flexibility."
    },
    {
      title: "Triangle Pose",
      benefit: "Strengthens thighs, stretches spine and improves digestion."
    },
    {
      title: "Standing Separate Leg Head to Knee Pose",
      benefit: "Stimulates abdominal organs and regulates metabolism."
    },
    {
      title: "Tree Pose",
      benefit: "Improves posture and balance, opens hips."
    },
    {
      title: "Toe Stand Pose",
      benefit: "Strengthens knees and improves mental focus."
    },
    {
      title: "Dead Body Pose",
      benefit: "Promotes relaxation and integrates benefits of previous poses."
    },
    {
      title: "Wind Removing Pose",
      benefit: "Aids digestion and massages internal organs."
    },
    {
      title: "Sit Up",
      benefit: "Strengthens abdominal muscles and energizes the body."
    },
    {
      title: "Cobra Pose",
      benefit: "Improves spinal strength and opens chest and shoulders."
    },
    {
      title: "Locust Pose",
      benefit: "Strengthens lower back and glutes."
    },
    {
      title: "Full Locust Pose",
      benefit: "Improves full spinal strength and opens chest."
    },
    {
      title: "Bow Pose",
      benefit: "Improves flexibility and opens shoulders and back."
    },
    {
      title: "Fixed Firm Pose",
      benefit: "Increases circulation in legs and strengthens knee joints."
    },
    {
      title: "Half Tortoise Pose",
      benefit: "Relieves stress, improves circulation and mental clarity."
    },
    {
      title: "Camel Pose",
      benefit: "Improves spinal flexibility and stimulates the nervous system."
    },
    {
      title: "Rabbit Pose",
      benefit: "Stretches spine and balances hormones."
    },
    {
      title: "Head to Knee with Stretching Pose",
      benefit: "Stimulates digestion and stretches hamstrings."
    },
    {
      title: "Spine Twisting Pose",
      benefit: "Improves spinal mobility and tones internal organs."
    },
    {
      title: "Blowing in Firm Pose",
      benefit: "Strengthens abdominal muscles and improves lung function."
    }
  ];

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

        {/* 26 Pose Videos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🧘 26&2 Pose Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {poses.map((pose, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <video controls className="w-full">
                  <source src={`/videos/pose${index + 1}.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{pose.title}</h3>
                  <p className="text-sm text-gray-600">{pose.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Session Videos */}
        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🕘 Full Sessions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <video controls className="w-full">
                <source src="/videos/fullsession1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="text-lg font-bold">90-Minute Full Class</h3>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <video controls className="w-full">
                <source src="/videos/fullsession2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="text-lg font-bold">Evening Relaxation Session</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}