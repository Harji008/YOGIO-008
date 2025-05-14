'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSpring, animated } from 'react-spring';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Feedback Type
type Feedback = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
};

// ✅ AnimatedRating Component
function AnimatedRating({ value }: { value: number }) {
  const { val } = useSpring({
    from: { val: 0 },
    to: { val: value },
    config: { duration: 1000 },
  });

  return (
    <div className="w-24 h-24 mx-auto mb-2">
      <animated.div style={{ width: '100%', height: '100%' }}>
        <CircularProgressbar
          value={(value / 5) * 100}
          text={`${value.toFixed(1)}/5`}
          styles={buildStyles({
            textSize: '22px',
            pathColor: '#10b981',
            textColor: '#065f46',
            trailColor: '#d1fae5',
          })}
        />
      </animated.div>
      <p className="text-center text-sm font-medium text-gray-600 mt-2">
        Average Rating
      </p>
    </div>
  );
}

// ✅ Main Page
export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('id, rating, comment, created_at, user_id')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error.message);
      } else {
        setFeedbackList(data || []);
      }

      setLoading(false);
    };

    fetchFeedback();
  }, []);

  const averageRating =
    feedbackList.length > 0
      ? feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length
      : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Feedback</h1>

      {/* ✅ Animated Overall Rating */}
      {feedbackList.length > 0 && <AnimatedRating value={averageRating} />}

      {/* ✅ Feedback List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-center text-pink-600 font-semibold">
          No feedback available.
        </p>
      ) : (
        <div className="space-y-4 mt-6">
          {feedbackList.map((fb) => (
            <div
              key={fb.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14">
                  <CircularProgressbar
                    value={(fb.rating / 5) * 100}
                    text={`${fb.rating}/5`}
                    styles={buildStyles({
                      textSize: '26px',
                      pathColor: '#facc15',
                      textColor: '#f59e0b',
                      trailColor: '#fefce8',
                    })}
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-sm">{fb.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(fb.created_at), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}