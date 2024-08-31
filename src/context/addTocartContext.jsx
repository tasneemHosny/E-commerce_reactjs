import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AddToCartContext=createContext()
function AddToCartProvider({children}) {
    let[numOfCartItems,setNumOfCartItems]=useState(0)
    let[totalCartPrice,setTotalCartPrice]=useState(0)
    let[cartProducts,setCartProducts]=useState(null)
    let [CartId,setCartId]=useState(0)
    let [loading,setIsLoading]=useState(false)
    let token={headers:{token:localStorage.getItem("token")}}
    async function AddToCart(productId){
        try {
            const res= await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {productId: productId},
                token
            )
            getFromCart()
            console.log(productId)
            return res.data
        } catch (error) {
            console.log(error)        
        }
    }
    async function getFromCart(){
        setIsLoading(true)
        try {
            const res=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",token)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartProducts(res.data.data.products)
            setCartId(res.data.cartId)
            setIsLoading(false)
            console.log(res.data,"get cart data")
            return res.data
        }
        catch(error){
            setIsLoading(false)
            console.log(error)   
        }
    }
    async function UpdateCount(id,count) {
        try{
            let res=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {count: count},
                token)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartProducts(res.data.data.products)
            setCartId(res.data.cartId)
            console.log(res,"updatecount")
            return res.data
        }
        catch(error){
            console.log(error,"updateCount")
        }
    }
    async function deleteItem(id) {
        try {
            let res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,token)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartProducts(res.data.data.products)
            setCartId(res.data.cartId)
            return res.data
        } catch (error) {
            console.log(error,"remove from cart")
        }
    }
    async function ClearCart() {
        try {
            let res=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",token)
            setNumOfCartItems(0)
            setTotalCartPrice(0)
            setCartProducts([])
            return res.data
        } catch (error) {
            console.log(error,"clear cart")
        }
    }
    useEffect(function(){
        if(localStorage.getItem("token")!=null){
            getFromCart()
        }
    },[localStorage.getItem("token") ])
    return (  
        <AddToCartContext.Provider value={{token,AddToCart,UpdateCount,deleteItem,ClearCart,numOfCartItems,cartProducts,totalCartPrice,CartId,setCartProducts,setNumOfCartItems,setTotalCartPrice,getFromCart,loading}}>
            {children}
        </AddToCartContext.Provider>
    );
}

export default AddToCartProvider;