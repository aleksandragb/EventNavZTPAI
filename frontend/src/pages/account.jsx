import React, { useState } from 'react';
import axios from 'axios';
import './home.css'; 
import './style.css'; 
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel';

function AccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Zapobiega domyślnej akcji przeglądarki
        const authToken = sessionStorage.getItem('authToken'); // Pobierz token z sesji

        try {
            if (email) {
                const response = await axios.put('http://localhost:8080/api/users/update-email', { newEmail: email }, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                console.log(response.data)
                alert('Email updated successfully');
            }
            if (password) {
                await axios.put('http://localhost:8080/api/users/update-password', { newPassword: password }, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                alert('Password updated successfully');
            }
        } catch (error) {
            console.error('Error updating account:', error);
            alert('Failed to update account. Please try again.');
        }
    };

    return(
        <div>
            <TopPanel />
            <div className="favorite-header">
                <h2>Change your data</h2>
            </div>
            <div className="container_change">
                <div className="login-container">
                    <form className="register" onSubmit={handleSubmit}>
                        <input 
                            className="iconpassword" 
                            name="email" 
                            type="email" 
                            placeholder="new-email@email.com" 
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input 
                            className="iconpassword" 
                            name="password" 
                            type="password" 
                            placeholder="New password" 
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button className="btn" type="submit">Save</button>
                    </form>
                </div>
            </div>
            <Bottom-Panel />
        </div>
    );
}

export default AccountPage;
