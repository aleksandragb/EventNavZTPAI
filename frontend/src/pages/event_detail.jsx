import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopPanel from './top_panel'; 
import BottomPanel from './bottom_panel'; 
import './home.css'; 

function EventDetail() {
    const {eventId} = useParams();
    const [event, setEvent] = useState(null);
    const [isInterested, setIsInterested] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationDate, setNotificationDate] = useState('');

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

    const handleNotificationSubmit = async () => {
        const payload = {
          eventId: eventId,
          reminderTime: notificationDate
        };
    
        try {
          await axios.post('http://localhost:8080/api/notifications', payload, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('authToken')}` }
          });
          alert('Notification set successfully!');
          setShowNotificationModal(false);
          setNotificationDate('');
        } catch (error) {
          console.error('Error setting notification:', error);
          alert('Failed to set notification.');
        }
      };

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
                    <div className="right">
                        <button id="notification-btn" onClick={() => setShowNotificationModal(true)}>
                            <i className="material-icons">notifications_none</i>
                        </button>

                        {showNotificationModal && (
                            <div className="notification-modal">
                                <div className="modal-content">
                                    <h4>Set Notification Time</h4>
                                    <input
                                        type="datetime-local"
                                        value={notificationDate}
                                        onChange={e => setNotificationDate(e.target.value)}
                                    />
                                    <button className="button-data" onClick={handleNotificationSubmit}>Submit</button>
                                    <button className="button-data" onClick={() => setShowNotificationModal(false)}>Cancel</button>
                                </div>
                            </div>
                        )}

                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p>Date: {new Date(event.date).toLocaleString()}</p>
                    <p>Place: {event.place}</p>
                    <p className="description">{event.description}</p>
                    <button className='btn' type="submit">BUY TICKET</button>
                </div>
            </div>
            <BottomPanel />
        </div>
    );
}

export default EventDetail;
