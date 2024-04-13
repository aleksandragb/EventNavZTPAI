import React from 'react'
import './home.css'; 
import './style.css'; 
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel';

function AccountPage() {
    return(
        <div>
            <TopPanel />
            <div className="favorite-header">
                <h2>Change your date</h2>
             </div>
             <div className="container_change">
            <div className="login-container">
                <form className="register" action="register" method="POST">
                    <input className="iconpassword" name="name" type="text" placeholder="name" />
                    <input className="iconpassword" name="surname" type="text" placeholder="surname" />
                    <input className="iconpassword" name="email" type="text" placeholder="email@email.com" />
                    <input className="iconpassword" name="password" type="password" placeholder="password" />
                    <input className="iconpassword" name="confirmedPassword" type="password" placeholder="confirm password" />
                    <button className="btn" type="submit">SAVE</button>
                </form>
            </div>
        </div>
            <BottomPanel />
        </div>
    );
}

export default AccountPage;
