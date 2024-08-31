import React, { useContext, useState } from 'react';
import { WishListContext } from '../../context/wishList_context';
import { Bars } from 'react-loader-spinner';
import { AddToCartContext } from '../../context/addTocartContext';
import toast from 'react-hot-toast'; // Assuming you are using react-hot-toast for notifications

function WishList() {
    const { RemoveFromWishList, wishListProducts, loader } = useContext(WishListContext);
    const { AddToCart } = useContext(AddToCartContext);
    const [loadingProductId, setLoadingProductId] = useState(null);

    async function addProduct(id) {
        setLoadingProductId(id);
        try {
            let response = await AddToCart(id);
            if (response) {
                toast.success(response.message); // Display success message
            } else {
                toast.error("Failed to add to cart"); // Display error message
            }
        } catch (error) {
            toast.error("An error occurred while adding to cart"); // Handle any errors
        } finally {
            setLoadingProductId(null);
        }
    }

    if (loader) {
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
            <section className="p-5">
                <div className="bg-[#e5e8e5] p-5 rounded-lg shadow-md">
                    <h1 className="text-xl mb-5 font-semibold text-center">My Wish List</h1>
                    {wishListProducts?.map((item, index) => (
                        <div
                            className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 mb-4 border-b-2 border-[#d8d7d7] pb-4"
                            key={index}
                        >
                            <div className="w-full sm:w-[150px]">
                                <img
                                    src={item.imageCover}
                                    alt={item.title}
                                    className="w-full h-auto object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center sm:items-start flex-1">
                                <p className="mb-2 text-lg font-medium text-center sm:text-left">{item.title}</p>
                                <p className="text-green-700 mb-2 text-lg text-center sm:text-left font-semibold">
                                    Price: {item.price}
                                </p>
                                <button
                                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-800 focus:outline-none"
                                    onClick={() => RemoveFromWishList(item.id)}
                                >
                                    <i className="fa-solid fa-trash-can text-center"></i>
                                    <span className="text-center">Remove</span>
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => addProduct(item.id)}
                                    type="button"
                                    className="w-full mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    disabled={loadingProductId === item.id}
                                >
                                    {loadingProductId === item.id ? (
                                        <i className="fa-solid fa-spin fa-spinner"></i>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default WishList;
