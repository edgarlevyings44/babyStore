import  { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Banner() { 
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://i.im.ge/2024/04/02/W6IDAp.Screenshot-2024-04-01-174408.png',
    'https://i.im.ge/2024/04/02/W6yIvf.Screenshot-2024-04-01-174721.png',
    'https://i.im.ge/2024/04/02/W6ywML.Screenshot-2024-04-01-174319.png',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return ( 
    <> 
      <div className="relative w-full h-70 block-lg overflow-hidden"> 
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="w-full h-full object-cover transition-opacity duration-300" /> 
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"> 
            <div className="absolute left-0 ml-6">
              <button onClick={prevSlide} className="text-white left-0"><IoIosArrowBack /></button>
            </div>
            <div className="absolute right-0 mr-6">
              <button onClick={nextSlide} className="text-white right-2"><IoIosArrowForward /></button>
            </div>
          </div> 
      </div> 
    </> 
    ) 
  } 

  export default Banner