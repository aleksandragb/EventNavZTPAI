import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function TopPanel() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        navigate('/login');
    };

    const isLoggedIn = !!sessionStorage.getItem('authToken');

    const handleLikedClick = () => {
        if (isLoggedIn) {
            navigate('/interested');
        } else {
            navigate('/login');
        }
    }

    const handleAccountClick = () => {
        if (isLoggedIn) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    }
    function getUserRoleFromToken() {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.role;
        }
        return null;
    }
    return (
        <div className="top-panel">
            <div className="left">
            <button id="menu-btn" onClick={toggleMenu}>
                <i className="material-icons">dehaze</i>
            </button>
                {isMenuOpen && (
                    <div className="menu">
                        <button className="option-in-menu-op" onClick={handleAccountClick}>My Account</button>
                        <button className="option-in-menu-op" onClick={handleLikedClick}>Liked</button>
                        <a href="/contact_us">Contact Us</a>
                        {getUserRoleFromToken() === "ADMIN" && (<a href="/add_event">Add Event</a>)}
                        {isLoggedIn ? (
                            <button className="option-in-menu" onClick={handleLogout}>Sign Out</button>
                        ) : (
                            <button className="option-in-menu" onClick={() => navigate('/login')}>Sign In</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopPanel;
