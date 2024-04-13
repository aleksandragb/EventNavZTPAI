import React from 'react';
import { Form } from "react-router-dom";
import './style.css'; 

function LoginPage() {
  return (
    <div className="container">
        <h1 className="title">EventNav</h1>
        <div className="login-container">
            <form className="login" action="login" method="POST">
                    <div className="form-group">
                        <label className="icon_login" htmlFor="login"></label>
                            <input className="iconlogin" id="login" name="email" type="text" placeholder="e-mail" />
                        
                    </div>
                    <div className="form-group">
                        <label className="icon_password" htmlFor="password"></label>
                            <input className="iconpassword" id="password" name="password" type="password" placeholder="password" />
                            
                    </div>
                    <button className='btn' type="submit">SIGN IN</button>
            </form>
            <p class="signup">Don't have an account? <a href="register">Sign up</a></p>
        </div>
    </div>
  );
}

export default LoginPage;
