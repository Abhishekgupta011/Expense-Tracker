import React from "react";
import "./Navbar.css"
const Navbar = () =>{
    return(
        <div>
            <nav className="navbar">
                <ul className="nav-items">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>

                </ul>
            </nav>
        </div>
    );
}
export default Navbar;