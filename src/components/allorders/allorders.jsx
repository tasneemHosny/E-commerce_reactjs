import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';

function AllOrders() {
    let { id } = jwtDecode(localStorage.getItem("token"));
    let [getOrderLoader, SetOrdersLoader] = useState(false);
    let [allOrders, setAllOrders] = useState([]);

    async function getOrders() {
        SetOrdersLoader(true);
        try {
            let res = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            );
            SetOrdersLoader(false);
            setAllOrders(res.data);
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log(error, "all orders");
            SetOrdersLoader(false);
        }
    }

    useEffect(function () {
        getOrders();
    }, []);

    if (getOrderLoader) {
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
        <>
            <section className="py-8">
                <div className="w-full md:w-[90%] m-auto">
                    <div className="flex flex-wrap justify-center items-center">
                        <h1 className='font-bold text-xl text-center mb-3'>All Orders</h1>
                        {allOrders?.map(function (order, idx) {
                            return (
                                <>
                                <div className="w-full p-3" key={idx}>
                                    <div className="inner p-3 bg-slate-300">
                                        <h2 className="text-green-700">
                                            Total Order Price : <span className="text-black font-normal">{order.totalOrderPrice} EGP</span>
                                        </h2>
                                        <h2 className="text-green-700 ">
                                            Order Payment Method : <span className="text-black font-normal">{order.paymentMethodType} </span>
                                        </h2>
                                        <h2 className="text-green-700 ">
                                            Order Status <span className="text-black font-normal">{order.isDelivered?"Delivered":"Not Delivered"}</span>
                                        </h2>
                                        <div className="flex flex-wrap">
                                            {order.cartItems?.map(function (item, index) {
                                                return (
                                                    <div
                                                        className="lg:w-1/6 md:w-1/4 sm:w-1/2 p-3"
                                                        key={index}
                                                    >
                                                        <img
                                                            src={item.product.imageCover}
                                                            alt=""
                                                            className="w-full"
                                                        />
                                                        <div>
                                                            <h2 className="text-green-700 mb-2">{item.product.title.split(" ").slice(0,2).join()}</h2>
                                                            <h2>Item Count :{item.count}</h2>
                                                            <div className="flex flex-wrap justify-between items-center mt-3 ">
                                                                <h4>{item.price} EGP</h4>
                                                                <h4><i className="fa-solid fa-star text-yellow-500 me-2"></i>{item.product.ratingsAverage}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AllOrders;
