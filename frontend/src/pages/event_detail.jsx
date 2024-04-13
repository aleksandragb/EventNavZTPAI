import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel'; 
import './home.css'; 

function EventDetail() {
    const { eventId } = useParams();
    const events = [
        { id: 1, title: "Event 1", date: "2024-04-12", place: "Place 1", photo: "photo1.jpg", description: "Description of Event 1" },
        { id: 2, title: "Event 2", date: "2024-04-13", place: "Place 2", photo: "photo2.jpg", description: "Description of Event 2" },
    ];

    const event = events.find(event => event.id === parseInt(eventId));
    if (!event) {
        return <div>Event not found</div>;
    }

    const [isInterested, setIsInterested] = useState(events.find(event => event.id === parseInt(eventId)).isInterested);

    const handleInterestedToggle = () => {
        setIsInterested(!isInterested);      
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
