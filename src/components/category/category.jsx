import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';

function Category() {
  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categories = data?.data?.data;

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
    <section className="py-8 bg-gray-100">
      <div className="w-full md:w-[90%] m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {categories?.map((item, index) => (
            <div
              className="relative flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              key={index}
            >
              <div className="w-full h-48 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;

