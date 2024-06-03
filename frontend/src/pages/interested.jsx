import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './home.css';
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel';

function InterestedPage() {
    const [interestedEvents, setInterestedEvents] = useState([]);

    useEffect(() => {
        const fetchInterestedEvents = async () => {
            const authToken = sessionStorage.getItem('authToken');
            const config = { headers: { Authorization: `Bearer ${authToken}` } };
            try {
                const response = await axios.get('http://localhost:8080/api/events/interested', config);
                setInterestedEvents(response.data); 
            } catch (error) {
                console.error('Failed to fetch interested events:', error);
            }
        };

        fetchInterestedEvents();
    }, []);
    
    return(
        <div>
            <TopPanel />
                <div>
                    <h2 className="main-text-container">Interested events</h2>
                </div>
                <div className="event-container">
                    {interestedEvents.length > 0 ? (
                            interestedEvents.map(event => (
                            <div key={event.event_id} className="event">
                                <img className="event_photo" src={event.photo} alt="Event Photo" />
                                <h3 className="event-title">{event.title}</h3>
                                <p>Date: {new Date(event.date).toLocaleString()}</p>
                                <p>Place: {event.place}</p>
                                <Link to={`/event_detail/${event.event_id}`} className="button">Show more</Link>
                            </div>
                        ))
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            <BottomPanel />
        </div>
    );
}

export default InterestedPage;
