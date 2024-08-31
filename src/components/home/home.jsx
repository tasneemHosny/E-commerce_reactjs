import React from 'react';
import Products from '../products/products';
import HomeSlider from '../homeSlider/homeSlider';
import CategorySlider from '../categorySlider.jsx/categorySlider';

function Home() {
    return (
       <>
       <HomeSlider></HomeSlider>
       <CategorySlider></CategorySlider>
       <Products/>
       </> 
    );
}

export default Home;