import React from "react";
import Slider from "react-slick";
import slider3 from "./../../assets/images/Shoes Sale Banner.png";
import slider2 from "./../../assets/images/electronics.jpg";
import slider1 from "./../../assets/images/Best Collection Fashion Banner.png";
import slider4 from "./../../assets/images/side1.png";
import slider5 from "./../../assets/images/side2.png";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <section className="py-5">
      <div className="flex flex-col md:flex-row">
        {/* Main Slider */}
        <div className="w-full md:w-[70%] mb-2">
          <Slider {...settings}>
            <div>
              <img src={slider1} className="w-full h-[250px] md:h-[450px] object-cover" alt="Slider 1" />
            </div>
            <div>
              <img src={slider2} className="w-full h-[250px] md:h-[450px] object-cover" alt="Slider 2" />
            </div>
            <div>
              <img src={slider3} className="w-full h-[250px] md:h-[450px] object-cover" alt="Slider 3" />
            </div>
          </Slider>
        </div>
        
        {/* Side Images */}
        <div className="w-full md:w-[30%] flex md:flex-col lg:flex-col sm:flex-row">
          <div className="w-full h-[200px] md:h-[225px] mb-2">
            <img src={slider5} alt="Side Image 1" className="w-full h-full object-contain" />
          </div>
          <div className="w-full h-[200px] md:h-[225px]">
            <img src={slider4} alt="Side Image 2" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
