'use client';
import { useState } from 'react';

const faqs = [
  {
    question: '💧 How much water should I drink before a hot yoga class?',
    answer:
      "It's recommended to drink at least 16–20 ounces of water 1–2 hours before class. Stay hydrated throughout the day, but avoid drinking too much right before the session to stay comfortable during practice.",
  },
  {
    question: '🚰 Can I bring water into the studio?',
    answer:
      'Yes! Bringing a water bottle is highly encouraged. Take small sips during class to stay hydrated without feeling too full.',
  },
  {
    question: '⚡ Should I replenish electrolytes after class?',
    answer:
      'Absolutely. Hot yoga causes a lot of sweating, so it’s important to replenish with electrolytes after class. Coconut water, electrolyte drinks, or fruits like bananas and oranges are great options.',
  },
  {
    question: '🧘‍♀️ Do I need any special equipment for hot yoga?',
    answer:
      'A yoga mat, a towel for your mat (to prevent slipping), and a water bottle are essential. You may also bring an extra towel for yourself. Wear breathable and moisture-wicking clothes.',
  },
  {
    question: '📅 What if I feel dizzy or overheated during class?',
    answer:
      'Always listen to your body. If you feel dizzy, take a break in child’s pose or lie down on your mat. Hydrate and never hesitate to step out of the room if needed.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden mt-20">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
        ❓ Frequently Asked Questions for Hot Yoga
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-purple-400 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-purple-700 font-medium text-lg hover:bg-purple-50 focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? '▲' : '▼'}</span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-[500px] py-4' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700 break-words whitespace-normal">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}