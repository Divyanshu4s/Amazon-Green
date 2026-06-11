import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">No Image Available</div>;
  }

  return (
    <div className="flex gap-4 h-[500px]">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-20 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setActiveIndex(idx)}
            className={`border-2 rounded overflow-hidden h-20 ${activeIndex === idx ? 'border-amazon-orange' : 'border-transparent hover:border-gray-300'}`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="flex-1 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center relative cursor-crosshair">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[activeIndex]}
            alt="Main product view"
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
