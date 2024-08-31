import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Bars } from 'react-loader-spinner';
import { Link } from "react-router-dom";
import { AddToCartContext } from "../../context/addTocartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../context/wishList_context";
function Products() {
    const { AddToCart } = useContext(AddToCartContext);
    const { addToWishList, RemoveFromWishList, wishListProducts } = useContext(WishListContext);
    const [loadingProductId, setLoadingProductId] = useState(null);

    async function getProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    async function addProduct(id) {
        setLoadingProductId(id);
        try {
            const response = await AddToCart(id);
            if (response && response.message) {
                toast.success(response.message);
            } else {
                toast.error("Failed to add to cart.");
            }
        } catch (error) {
            toast.error("An error occurred while adding to cart.");
        }
        setLoadingProductId(null);
    }

    function toggleWishlist(id) {
        if (wishListProducts.some(product => product.id === id)) {
            RemoveFromWishList(id);
            toast.success("Removed from Wishlist");
        } else {
            addToWishList(id);
            toast.success("Added to Wishlist");
        }
    }

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
        <>
            <section className="py-8">
                <div className="w-full px-5 md:w-[90%] m-auto">
                    <div className="flex flex-wrap items-center">
                        {data?.data.data.map((item, index) => {
                            const isInWishlist = wishListProducts.some(product => product.id === item.id);
                            return (
                                <div className="w-full lg:w-1/5 lg:p-0 md:w-1/4 md:p-0 sm:w-1/2 p-3" key={index}>
                                    <div className="inner p-3 bg-slate-300">
                                        <Link to={`/productDetails/${item.id}`}>
                                            <img src={item.imageCover} alt="" className="w-full" />
                                            <h2 className="text-green-700 mb-2">{item.category.name}</h2>
                                            <h2>{item.title.split(" ").slice(0, 2).join(" ")}</h2>
                                            <div className="flex flex-wrap justify-between items-center mt-3">
                                                <h4>{item.price} EGP</h4>
                                                <h4><i className="fa-solid fa-star text-yellow-500 me-2"></i>{item.ratingsAverage}</h4>
                                            </div>
                                        </Link>
                                        <div className="flex justify-between items-center">
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
                                            <button
                                                onClick={() => toggleWishlist(item.id)}
                                                className="text-xl"
                                            >
                                                <i className={`fa-heart ${isInWishlist ? 'fa-solid' : 'fa-regular'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Products;
