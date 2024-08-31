//token : user data sent by backend when user is login 
//used in login , cart , -----
//shared token => context =>store of data shared over apllication used in any copmonent (state management)
//context=>not acceced by any one by when refreshiing data is lost 
//localStorage=>accesed by any one but keeps data
//we get use of both
import {createContext, useEffect, useState } from "react";
export let AuthContext=createContext()
function AuthProvider({children}){
    const [token,setToken]=useState(null)
    useEffect(function(){
        if(localStorage.getItem("token")!==null){
            setToken(localStorage.getItem("token"))
        }
    },[])
    return (
        <AuthContext.Provider value={{token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider