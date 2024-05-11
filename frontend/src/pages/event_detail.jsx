import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel'; 
import './home.css'; 

function EventDetail() {
    const { eventId} = useParams();
    const [event, setEvent] = useState(null);
    const [isInterested, setIsInterested] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${eventId}`, {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` } 
                });
                setEvent(response.data);
                setIsInterested(response.data.isInterested); 
            } catch (error) {
                console.error('Failed to fetch event details:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return <div>Event not found</div>;
    }

    const handleInterestedToggle = () => {
        setIsInterested(!isInterested);
        // You may also want to send a request to update the server here
    };

    return (
        <div>
            <TopPanel />
            <div className="event-container">
                <div className="event">
                    <img className="event_photo" src={event.photo} alt="Event Photo" />
                    <a className={`interested-icon ${isInterested ? 'interested' : ''}`} onClick={handleInterestedToggle}>
                        <i className="material-icons">{isInterested ? 'star' : 'star_border'}</i>
                    </a>
                    <h3 className="event-title">{event.title}</h3>
                    <p>Date: {new Date(event.date).toLocaleString()}</p>
                    <p>Place: {event.place}</p>
                    <p>{event.description}</p>
                </div>
            </div>
            <BottomPanel />
        </div>
    );
}

export default EventDetail;
