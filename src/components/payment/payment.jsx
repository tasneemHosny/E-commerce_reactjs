import React, { useContext, useState } from 'react';
import { AddToCartContext } from '../../context/addTocartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import NotFound from '../notFound/notFound';
import { useNavigate } from 'react-router-dom';
function Payment() {
    let{token,CartId,setNumOfCartItems,setCartProducts,setTotalCartPrice}=useContext(AddToCartContext)
    let [address,setaddress]=useState(null)
    let [phone,setphone]=useState(null)
    let [details,setDetails]=useState(null)
    let [city,setcity]=useState(null)
    let[CashPayLoader,setCashPayLoader]=useState(false)
    let[OnlinePayLoader,setOnlinePayLoader]=useState(false)
    let navigate=useNavigate()
    let shippingInfo
    function CashCheckout(){
        shippingInfo={
            address,
            phone,
            details,
            city
        }
        console.log(shippingInfo)
        Cashpay()
        setCartProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        navigate("/products")
    }
    function OnlinePayCheckout(){
        shippingInfo={
            address,
            phone,
            details,
            city
        }
        console.log(shippingInfo)
        OnlinePayment()
    }
    async function Cashpay() {
        setCashPayLoader(true)
        try {
            let res=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,shippingInfo,token)
            console.log(res.data)
            toast.success(res.data.status)
            setCashPayLoader(false)
            return res.data
        } catch (error) {
            console.log(error,"cashpayment")
            setCashPayLoader(false)
        }
    }
    async function OnlinePayment() {
        setOnlinePayLoader(true)
        try {
        let res = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${window.location.origin}`,
          shippingInfo,
          token
        );
            console.log(res.data)
            toast.success(res.data.status)
            setOnlinePayLoader(false)
            window.open(res.data.session.url)
            return res.data
        } catch (error) {
            console.log(error,"online Payment")
            setOnlinePayLoader(false)
        }
    }
    if(setNumOfCartItems===0){
        return(
            <NotFound></NotFound>
        )
    }
    return (
        <>
         <div className="py-10">
            <h1 className="text-green-700 text-center text-2xl font-bold mb-10">Shipping Information</h1>
            <div className="md:w-[60%] mx-auto px-5">
                <form onSubmit={function(e){e.preventDefault()}}>
                    {/** shipping Address */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="text" 
                            name="shippingAddress" 
                            id="shippingAddress" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            onChange={function(e){setaddress(e.target.value)}}
                        />
                        <label 
                            htmlFor="shippingAddress" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Shipping Address
                        </label>
                    </div>

                    {/** details Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <textarea
                            name="details" 
                            id="details" 
                            className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            onChange={function(e){setDetails(e.target.value)}}
                        >
                        </textarea>
                        <label 
                            htmlFor="details" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Details
                        </label>
                    </div>
                    {/** Phone Number Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="tel" 
                            name="phone" 
                            id="floating_phone" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            onChange={function(e){setphone(e.target.value)}}
                        />
                        <label 
                            htmlFor="floating_phone" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Phone Number
                        </label>
                    </div>
                    {/** city Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="text" 
                            name="city" 
                            id="floating_city" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                            onChange={function(e){setcity(e.target.value)}}
                        />
                        <label 
                            htmlFor="floating_city" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            City
                        </label>
                    </div>

                    {/** payment Button */}
                    <button onClick={CashCheckout} type="button" className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {CashPayLoader?<i className="fa-solid fa-spin fa-spinner "></i>:"Cash payment"}
                    </button>
                    <button onClick={OnlinePayCheckout} type="button" className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {OnlinePayLoader?<i className="fa-solid fa-spin fa-spinner "></i>:"Online payment"}
                    </button>                
                </form>
            </div>
        </div>
        </>
    );
}

export default Payment;