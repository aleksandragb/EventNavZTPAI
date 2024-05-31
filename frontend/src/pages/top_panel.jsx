import React, { useState } from 'react';

function TopPanel({ isAdmin, showSearchBar }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="top-panel">
            <div className="left">
            <button id="menu-btn" onClick={toggleMenu}>
                <i className="material-icons">dehaze</i>
            </button>
                {isMenuOpen && (
                    <div className="menu">
                        <a href="/account">My Account</a>
                        <a href="/interested">Liked</a>
                        <a href="/contact_us">Contact Us</a>
                        {isAdmin && <a href="/addEvent">Add Event</a>}
                        <a href="/logout">Sign Out</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopPanel;
