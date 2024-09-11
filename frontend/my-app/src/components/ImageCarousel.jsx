import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo1 from "../assets/logo1.jpg";

const ImageCarousel = () => {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      dynamicHeight={true}
      interval={1000}
      className="w-full h-full" // Ensure the carousel takes full width and height
    >
      <div>
        <img src={logo1} alt="Logo 1" className="w-full h-auto object-cover" />
      </div>
      <div>
        <img src={logo1} alt="Logo 2" className="w-full h-auto object-cover" />
      </div>
      <div>
        <img src={logo1} alt="Logo 3" className="w-full h-auto object-cover" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;

// w-[21.9rem] h-64

