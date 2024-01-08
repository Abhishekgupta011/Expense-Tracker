import React from "react";
import "./Navbar.css"
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthSlice";
import { useNavigate } from "react-router";
const Navbar = () =>{
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const logoutHandler = ()=>{
    dispatch(authActions.logout());
    localStorage.removeItem("idToken");
    navigate('/')
    localStorage.removeItem("email");
 }
    return(
        <div>
            <nav className="navbar">
                <ul className="nav-items">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <li><button onClick={logoutHandler}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
}
export default Navbar;