import { data } from 'autoprefixer';
import axios from 'axios';
import React, { createContext, useContext, useState , useEffect } from 'react';
export let WishListContext=createContext()
function WishListProvider({children}) {
    let [loader,setIsLoading]=useState(0)
    let [wishListProducts,setwishListProducts]=useState([])
    let token={headers:{token:localStorage.getItem("token")}}
    async function addToWishList(productid) {
        try {
            let res=await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId:productid
                }
                ,token)
            GetFromWishList()
            console.log(res.data,"add to wish list")
            return res.data
        } catch (error) {
            console.log(error,"add to wish list")
        }
    }
    async function RemoveFromWishList(productid) {
        try {
            let res=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,token)
            console.log(res.data,"remove from wish list")
            GetFromWishList()
            return res.data
        } catch (error) {
            console.log(error,"remove from wish list")
        }
    }
    async function GetFromWishList() {
        setIsLoading(true)
        try {
            let res=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,token)
            console.log(res.data,"get from wish list")
            setwishListProducts(res.data.data)
            setIsLoading(false)
            return res.data
        } catch (error) {
            console.log(error,"get from wish list")
            setIsLoading(false)
        }
    }
    useEffect(function(){
        if(localStorage.getItem("token")!=null){
            GetFromWishList()
        }
    },[localStorage.getItem("token") ])
    return (
        <WishListContext.Provider value={{addToWishList,RemoveFromWishList,GetFromWishList,wishListProducts,loader}}>
            {children}
        </WishListContext.Provider>
    );
}

export default WishListProvider;