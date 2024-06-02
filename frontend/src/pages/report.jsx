import React from 'react'
import './home.css'; 
import './style.css'; 
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel';

function ReportPage() {
    return(
        <div>
            <TopPanel />
            <div className='reported-info-contener'>
                <div className="report-info">
                    <h2>Do you know about any events that we don't have on our website? Inform us!</h2>
                </div>
             </div>
             <div className="container_change">
            <div className="login-container">
                <form className="register" action="register" method="POST">
                    <input className="iconpassword" name="title" type="text" placeholder="title" />
                    <input className="iconpassword" name="date" type="datetime-local" placeholder="date" />
                    <input className="iconpassword" name="place" type="text" placeholder="place" />
                    <input className="iconpassword" name="category" type="text" placeholder="category" />
                    <input className="iconpassword" name="description" type="text" placeholder="description" />
                    <button className="btn" type="submit">Report</button>
                </form>
            </div>
        </div>
            <BottomPanel />
        </div>
    );
}

export default ReportPage;
