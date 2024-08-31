import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';

function Brands({ onOpenModal }) {
  async function getBrands() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  const brands = data?.data?.data;

  if (isLoading) {
    return (
      <div className="h-[100vh] bg-slate-300 flex justify-center items-center">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="w-full md:w-[90%] m-auto">
        <h2 className='text-2xl text-center font-bold mb-5'> All Brands</h2>
        <div className="flex flex-wrap items-center overflow-hidden">
          {brands?.map((item, index) => (
            <div
              className="w-full lg:w-1/4 lg:p-0 md:w-1/3 md:p-0 sm:w-1/2 p-5 m-auto transform transition-transform duration-300 hover:scale-105"
              key={index}
              onClick={() => onOpenModal(
                <div>
                  <h2>{item.name}</h2>
                  <img src={item.image} alt={item.name} className="w-full" />
                </div>
              )}
            >
              <div className="inner p-3 bg-slate-300">
                <img src={item.image} alt={item.name} className="w-full" />
                <h2 className="text-center font-bold mt-3">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;
