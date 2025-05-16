import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/">XMedify</Link>
                <div className="nav-links">
                    <Link to="/">Find Doctors</Link>
                    <Link to="/">Hospitals</Link>
                    <Link to="/">Medicines</Link>
                    <Link to="/my-bookings">My Bookings</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;