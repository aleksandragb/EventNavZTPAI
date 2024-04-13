import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 
import TopPanel from './top_panel'; 
import SearchBar from './searchbar'; 
import BottomPanel from './bottom_panel';

function HomePage() {
    const events = [
        { id: 1, title: "Event 1", date: "2024-04-12", place: "Place 1", photo: "photo1.jpg" },
        { id: 2, title: "Event 2", date: "2024-04-13", place: "Place 2", photo: "photo2.jpg" },
    ];

    return (
        <div>
            <TopPanel />
            <SearchBar showSearchBar={true} />
            <div className="event-container">
                {events.map(event => (
                    <div key={event.id} className="event">
                        <img className="event_photo" src={event.photo} alt="Event Photo" />
                        <h3 className="event-title">{event.title}</h3>
                        <p>Date: {new Date(event.date).toLocaleString()}</p>
                        <p>Place: {event.place}</p>
                        <Link to={`/event_detail/${event.id}`} className="button">Show more</Link>
                    </div>
                ))}
            </div>
            <BottomPanel />
        </div>
    );
}

export default HomePage;
