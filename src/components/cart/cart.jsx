import { useContext } from "react";
import { Bars } from "react-loader-spinner";
import { AddToCartContext } from "../../context/addTocartContext";
import { Link } from "react-router-dom";
function Cart() {
    let { ClearCart, numOfCartItems, deleteItem, UpdateCount, cartProducts, totalCartPrice, loading } = useContext(AddToCartContext);

    if (loading) {
        return (
            <div className="h-[100vh] bg-slate-300 flex justify-center items-center">
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    return (
        <>
            <section className="p-5">
                <div className="bg-[#e5e8e5] p-5 rounded-lg shadow-md">
                    <h1 className="text-xl mb-2 font-semibold text-center">Shop Cart:</h1>
                    {numOfCartItems !== 0 ? (
                        <div className="flex justify-between mb-4">
                        <h4 className="text-green-700 text-lg font-medium">
                            Total Cart Price: {totalCartPrice}
                        </h4>
                        <h4 className="text-green-700 text-lg font-medium">
                            Total items: {numOfCartItems}
                        </h4>
                    </div>
                    ) : (
                        <div className="text-green-700 text-center text-xl font-bold mb-4">The Cart is empty</div>
                    )}
                    {cartProducts?.map((item, index) => (
                        <div
                            className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 mb-4 border-b-2 border-[#d8d7d7] pb-4"
                            key={index}
                        >
                            <div className="w-full sm:w-[150px]">
                                <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="w-full h-auto object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col items-center sm:items-start flex-1">
                                <p className="mb-2 text-lg font-medium text-center sm:text-left">{item.product.title}</p>
                                <p className="text-green-700 mb-2 text-lg text-center sm:text-left font-semibold">
                                    Price: {item.price}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-end gap-4 w-full">
                                    <button
                                        className="flex items-center justify-center gap-2 text-red-600 hover:text-red-800 focus:outline-none"
                                        onClick={() => deleteItem(item.product.id)}
                                    >
                                        <i className="fa-solid fa-trash-can text-center"></i>
                                        <span className="text-center">Remove</span>
                                    </button>
                                    <div className="flex items-center gap-2 sm:ml-auto">
                                        <button
                                            className="bg-green-700 flex items-center justify-center text-white px-2 py-1 rounded text-lg"
                                            disabled={item.count === 0}
                                            onClick={() => UpdateCount(item.product.id, item.count + 1)}
                                        >
                                            +
                                        </button>
                                        <p className="text-lg">{item.count}</p>
                                        <button
                                            className="bg-green-700 flex items-center justify-center text-white px-3 py-1 rounded text-lg"
                                            onClick={() => UpdateCount(item.product.id, item.count - 1)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {numOfCartItems !== 0 && (
                        <div className="flex flex-col items-center gap-5 mt-5 sm:flex-row sm:justify-center">
                            <button
                                onClick={ClearCart}
                                className="border rounded-md  p-2 bg-red-700 hover:border-red-700 hover:bg-white text-white hover:text-black"
                            >
                                Clear Cart
                            </button>
                            <Link
                                to="/payment"
                                className="p-2 border rounded-md bg-green-700 hover:border-green-700 hover:bg-white text-white hover:text-black"
                            >
                                Check Out
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Cart;
