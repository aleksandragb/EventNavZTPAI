import React from 'react';
import './style.css'; 

function RegisterPage() {
    return (
        <div className="container">
            <h1 className="title">EventNav</h1>
            <div className="login-container">
                <form className="register" action="register" method="POST">
                    <input className="iconpassword" name="name" type="text" placeholder="name" />
                    <input className="iconpassword" name="surname" type="text" placeholder="surname" />
                    <input className="iconpassword" name="email" type="text" placeholder="email@email.com" />
                    <input className="iconpassword" name="password" type="password" placeholder="password" />
                    <input className="iconpassword" name="confirmedPassword" type="password" placeholder="confirm password" />
                    <button className="btn" type="submit">REGISTER</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
