import React from 'react';
import TopPanel from './top_panel';
import BottomPanel from './bottom_panel';
import './home.css'; 

function ContactUsPage() {
    return (
        <div>
            <TopPanel />

            <div className="contact-us-container">
                <h1>Contact Us</h1>
                <div className="contact-boxes">
                    <div className="contact-box1">
                        <h2>Contact</h2>
                        <p>Email: example@example.com</p>
                        <p>Phone: +48 123 456 789</p>
                    </div>
                    <div className="contact-box2">
                        <h2>HQ</h2>
                        <p>Address: 123 Street Name, City</p>
                    </div>
                </div>
            </div>

            <BottomPanel />
        </div>
    );
}

export default ContactUsPage;
