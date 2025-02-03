import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  const images = [
    // 'https://via.placeholder.com/800x400?text=Slide+1',
    // 'https://via.placeholder.com/800x400?text=Slide+2',
    // 'https://via.placeholder.com/800x400?text=Slide+3',
    '/images/aj.png',
    '/images/new.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-3xl shadow-2xl">
      {/* Image Slides */}
      <div className="relative w-full h-96">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-3xl"></div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all z-20"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all z-20"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
