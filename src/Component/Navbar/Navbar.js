import React, { useContext } from "react";
import "./Navbar.css"
import AuthContext from "../Context/AuthContext";
const Navbar = () =>{

   const AuthCtx = useContext(AuthContext)
    return(
        <div>
            <nav className="navbar">
                <ul className="nav-items">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <li><button onClick={AuthCtx.logout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
}
export default Navbar;