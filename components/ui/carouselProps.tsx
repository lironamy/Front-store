"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
  label: string;
  images: { url: string }[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval, label }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
  
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currentIndex, images, interval]);
  

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePrevClick(),
    onSwipedRight: () => handleNextClick(),
    trackMouse: true,
    trackTouch: true,
  });


  return (
  <>
          <div {...handlers} className="relative rounded-xl overflow-hidden cursor-pointer">
        {images && images.length > 0 && (
          <div style={{ backgroundImage: `url(${images[currentIndex].url})` }} className="rounded-xl aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center">
            <div className="h-full w-full flex flex-col justify-end items-start text-center gap-y-8">
              <div className="bg-black bg-opacity-70 flex flex-col justify-end items-start text-center gap-y-8 pr-2 title-picture-wrapper">
                <div className="font-bold text-white text-xl sm:text-5xl lg:text-5xl">
                  <h1>{label}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        <div></div>
        <button className="absolute top-1/2 left-9 transform -translate-y-1/2" onClick={handleNextClick}>
          <ArrowLeftCircle size={40} color='white' strokeWidth={2} />
        </button>
        <button className="absolute top-1/2 right-9 transform -translate-y-1/2" onClick={handlePrevClick}>
          <ArrowRightCircle size={40} color='white' strokeWidth={2} />
        </button>
      </div>

      <div className="flex justify-center items-center gap-x-8 mt-2  z-10">
              {images.map((image, index) => (
                <div
                  key={image.url}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentIndex ? "bg-gray-600" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
        </div> 
  </>
  );
};

export default Carousel;
