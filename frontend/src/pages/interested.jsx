import React from 'react'
import './home.css'; 
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel';

function InterestedPage() {
    return(
        <div>
            <TopPanel />
            <div class="favorite-header">
                <h2>Liked</h2>
             </div>
            <BottomPanel />
        </div>
    );
}

export default InterestedPage;
