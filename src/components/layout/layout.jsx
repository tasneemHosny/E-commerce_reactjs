import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import MyNavbar from "../navbar/navbar";

function Layout() {
    return ( 
        <div className="relative">
        <Navbar></Navbar>
        <Outlet></Outlet>
        </div>
     );
}

export default Layout;