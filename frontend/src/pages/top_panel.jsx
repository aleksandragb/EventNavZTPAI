import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TopPanel({ isAdmin, showSearchBar }) {
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

    return (
        <div className="top-panel">
            <div className="left">
            <button id="menu-btn" onClick={toggleMenu}>
                <i className="material-icons">dehaze</i>
            </button>
                {isMenuOpen && (
                    <div className="menu">
                        <button className="option-liked-in-menu" onClick={handleAccountClick}>My Account</button>
                        <button className="option-liked-in-menu" onClick={handleLikedClick}>Liked</button>
                        <a href="/contact_us">Contact Us</a>
                        {isAdmin && <a href="/addEvent">Add Event</a>}
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
