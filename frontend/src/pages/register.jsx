import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        name,
        surname,  
        email,
        password
      });
      const token = response.data.token;

      sessionStorage.setItem('authToken', token);

      console.log('Registered successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error during register:', error);
    }
  };

    return (
        <div className="container">
            <h1 className="title">EventNav</h1>
            <div className="login-container">
                <form className="register" onSubmit={handleRegister}>
                    <input className="iconpassword" name="name" type="text" placeholder="name" 
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    <input className="iconpassword" name="surname" type="text" placeholder="surname" 
                        value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <input className="iconpassword" name="email" type="text" placeholder="email@email.com" 
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="iconpassword" name="password" type="password" placeholder="password" 
                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="btn" type="submit">REGISTER</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
