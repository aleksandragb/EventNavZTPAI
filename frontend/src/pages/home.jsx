import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';
import TopPanel from './top_panel';
import SearchBar from './searchbar';
import BottomPanel from './bottom_panel';

function HomePage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <TopPanel />
            <SearchBar showSearchBar={true} />
            <div className="event-container">
                {events.map(event => (
                    <div key={event.event_id} className="event">
                        <img className="event_photo" src={event.photo} alt="Event Photo" />
                        <h3 className="event-title">{event.title}</h3>
                        <p>Date: {new Date(event.date).toLocaleString()}</p>
                        <p>Place: {event.place}</p>
                        <Link to={`/event_detail/${event.event_id}`} className="button">Show more</Link>
                    </div>
                ))}
            </div>
            <BottomPanel />
        </div>
    );
}

export default HomePage;
