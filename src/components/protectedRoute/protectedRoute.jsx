function ProtectedRoute({children}) {
    if(localStorage.getItem("token")===null){
        return(
            <>
            <div className="text-red-800 text-center">you are not login</div>
            </>
        )
    }
    return ( 
        <>
        {children}
        </>
     );
}

export default ProtectedRoute;