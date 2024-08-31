import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { AddToCartContext } from '../../context/addTocartContext';
import { WishListContext } from '../../context/wishList_context';
import toast from 'react-hot-toast';

function ProductDetails() {
    const { id } = useParams();
    const { AddToCart } = useContext(AddToCartContext);
    const { addToWishList, RemoveFromWishList, wishListProducts } = useContext(WishListContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingProductId, setLoadingProductId] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                toast.error('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    async function addProduct() {
        setLoadingProductId(id);
        try {
            const response = await AddToCart(id);
            if (response && response.message) {
                toast.success(response.message);
            } else {
                toast.error('Failed to add to cart.');
            }
        } catch (error) {
            toast.error('An error occurred while adding to cart.');
        }
        setLoadingProductId(null);
    }

    function toggleWishlist() {
        if (wishListProducts.some(item => item.id === id)) {
            RemoveFromWishList(id);
            toast.success('Removed from Wishlist');
        } else {
            addToWishList(id);
            toast.success('Added to Wishlist');
        }
    }

    if (loading) {
        return (
            <div className="h-[100vh] bg-slate-200 flex justify-center items-center">
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

    if (!product) return <div className="text-center text-red-500">Product not found</div>;

    const isInWishlist = wishListProducts.some(item => item.id === id);

    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2 p-4">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    {/* Details Section */}
                    <div className="lg:w-1/2 p-4">
                        <h1 className="text-3xl font-bold text-green-700 mb-4">{product.title}</h1>
                        <h2 className="text-xl text-gray-700 mb-2">{product.category.name}</h2>
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">{product.price} EGP</h3>
                        <div className="flex items-center mb-4">
                            <i className="fa-solid fa-star text-yellow-500 me-2"></i>
                            <span className="text-lg">{product.ratingsAverage}</span>
                        </div>
                        <p className="text-gray-800 mb-6">{product.description}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={addProduct}
                                type="button"
                                className="w-full lg:w-auto bg-green-700 text-white hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300"
                                disabled={loadingProductId === id}
                            >
                                {loadingProductId === id ? (
                                    <i className="fa-solid fa-spin fa-spinner"></i>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                            <button
                                onClick={toggleWishlist}
                                className="text-xl text-red-500 hover:text-red-700"
                            >
                                <i className={`fa-heart ${isInWishlist ? 'fa-solid' : 'fa-regular'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
