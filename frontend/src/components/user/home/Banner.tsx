// components/Banner.tsx
'use client';

import { useEffect, useState } from 'react';

const images = [
  { src: '/images/banner1.png', alt: 'Khuyến mãi mùa hè' },
  { src: '/images/banner2.jpg', alt: 'Tour giá sốc' },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 4 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mt-6">
      <div className="relative container-width h-[300px] mx-auto overflow-hidden rounded-xl shadow-lg mt-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.alt}
              className="w-full flex-shrink-0 object-cover h-[300px]"
            />
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-white' : 'bg-gray-400'} transition-all`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
