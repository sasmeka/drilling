import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


function TestimonialSlider({ testimonials }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const previousSlide = () => {
      const lastIndex = testimonials.length - 1;
      const shouldResetIndex = currentIndex === 0;
      const index = shouldResetIndex ? lastIndex : currentIndex - 1;
      setCurrentIndex(index);
    };
  
    const nextSlide = () => {
      const lastIndex = testimonials.length - 1;
      const shouldResetIndex = currentIndex === lastIndex;
      const index = shouldResetIndex ? 0 : currentIndex + 1;
      setCurrentIndex(index);
    };

    const [isTransitioning, setIsTransitioning] = useState(false);

    

  
    return (
        <div className="relative w-full overflow-hidden">
        <div className="z-9999 flex justify-between w-full absolute top-1/2 transform -translate-y-1/2">
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-white rounded-lg shadow-md w-[25px]"
            onClick={previousSlide}
          >
            <FiChevronLeft size={24} className="p-2"/>
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-white rounded-lg shadow-md w-[25px]"
            onClick={nextSlide}
          >
            <FiChevronRight size={24} className="p-2" />
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
              <div className="flex items-center justify-center w-full">
                <div className="w-[200px] md:w-[300px] lg:w-[600px] bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center gap-2">
                    <img className="w-10" src={testimonials[currentIndex].image} alt="" />
                    <h1 className="mt-4 font-bold text-xs md:text-md">{testimonials[currentIndex].name}</h1>
                    <h3 className="text-[9px] md:text-xs">{testimonials[currentIndex].profession}</h3>
                    <p className="text-gray-600 text-center mt-4 text-[9px] md:text-xs">{testimonials[currentIndex].message}</p>
                </div>
              </div>
        </div>
        <div className="flex mt-4 justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 mx-1 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }

export default TestimonialSlider;
