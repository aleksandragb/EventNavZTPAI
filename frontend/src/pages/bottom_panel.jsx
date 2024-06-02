import React from 'react';

function BottomPanel() {
    return (
        <div className="bottom-panel">
            <div className="icon-buttons">
                <a href="/home"><i className="material-icons">explore</i><span>Explore</span></a>
                <a href="/account"><i className="material-icons">person</i><span>Account</span></a>
                <a href="#"><i className="material-icons">view_array</i><span>Tickets</span></a>
                <a href="/report"><i className="material-icons">add_circle</i><span>Report</span></a>
            </div>
        </div>
    );
}

export default BottomPanel;
