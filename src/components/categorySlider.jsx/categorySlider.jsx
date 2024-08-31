import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  async function getAllCategories() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data;
  }

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  console.log(data?.data);

  return (
    <section className="py-7">
      <div className="mb-2">
        <Slider {...settings}>
          {data?.data?.data?.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-full h-[250px]" />
              <h3 className="text-center mt-2">{item.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
