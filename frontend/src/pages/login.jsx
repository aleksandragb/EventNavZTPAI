import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook do nawigacji

  const handleLogin = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
        email,
        password
      });
      const token = response.data.token;

      sessionStorage.setItem('authToken', token);

      console.log('Logged in successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
        <h1 className="title">EventNav</h1>
        <div className="login-container">
            <form className="login" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="icon_login" htmlFor="login"></label>
                            <input className="iconlogin" id="login" name="email" type="text" placeholder="e-mail" 
                              value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="icon_password" htmlFor="password"></label>
                            <input className="iconpassword" id="password" name="password" type="password" placeholder="password"
                              value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='btn' type="submit">SIGN IN</button>
            </form>
        </div>
        <p className="signup">Don't have an account? <a href="/register">Sign up</a></p>
    </div>
  );
}

export default LoginPage;
