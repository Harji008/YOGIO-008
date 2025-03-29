'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const images = [
  'y1.jpg', 'y2.jpg', 'y3.jpg', 'y4.jpg', 'y5.jpg',
  'y6.jpg', 'y7.jpg', 'y8.jpg', 'y9.jpg', 'y0.jpg'
]

export default function YogaGallery() {
  return (
    <div className="bg-white py-12 px-4">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">🧘 Yoga Moments</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/${img}`}
              alt={`Yoga ${index + 1}`}
              className="rounded-xl w-full h-80 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}