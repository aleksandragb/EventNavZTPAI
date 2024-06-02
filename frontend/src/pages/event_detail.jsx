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
    const [error, setError] = useState(null); 

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        const config = {
            headers: {}
        };
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
    
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${eventId}`, config);
                setEvent(response.data);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
                setError('Failed to fetch event details');
            }
        };
    
        const fetchIsInterested = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/interests/isInterested/${eventId}`, config);
                setIsInterested(response.data);
                console.log("Interest status: ", response.data);
            } catch (error) {
                console.error('Failed to fetch interest status:', error);
                setError('Failed to fetch interest status');
            }
        }
    
        fetchEvent();
        fetchIsInterested();
    }, [eventId]);
    
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>Loading...</div>;
    }

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
          alert('Failed to set notification. \nLog in if you want to send a notification');
        }
      };

    if (!event) {
        return <div>Event not found</div>;
    }


    const handleInterestedToggle = async () => {
        const authToken = sessionStorage.getItem('authToken');
        if(!authToken) {
            alert("You need to log in to perform this operation");
            return;
        }

        const url = `http://localhost:8080/api/interests/${isInterested ? 'remove' : 'add'}/${eventId}`;
        const config = { headers: { Authorization: `Bearer ${authToken}` } }
    
        console.log(isInterested);
        console.log(authToken);
        console.log(url);
        try {
            await axios.post(url, {}, config);
            setIsInterested(!isInterested);
        } catch (error) {
            console.error('Failed to update interest:', error);
            alert('Failed to update interest. Please try again.');
        }
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
