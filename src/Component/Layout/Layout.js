import React from "react";
import './Layout.css';
import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="welcome">
            <div>
                <h1>Welcome to Expense Tracker</h1>
            </div>
            <div className="profile">
                <p>Your profile is incomplete. <Link to="/profilepage"><span>Complete now</span></Link></p>
            </div>
        </div>
    )
}

export default Layout;
