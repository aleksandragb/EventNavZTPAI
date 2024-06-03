import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';
import TopPanel from './top_panel';
import SearchBar from './searchbar';
import BottomPanel from './bottom_panel';

function HomePage() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const token = sessionStorage.getItem('authToken');
            const config = {
                headers: {}
            };
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/events', config);
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };
    
        fetchEvents();
    }, []);

    
    const filteredEvents = events.filter(event => {
        return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               event.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    

    return (
        <div>
            <TopPanel />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="event-container">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
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

export default HomePage;
