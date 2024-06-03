import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopPanel from './top_panel';
import BottomPanel from './bottom_panel';
import './style.css';

function CreateEventPage() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [place, setPlace] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, date, place, category: { categoryId }, description, photo };
        console.log(eventData);

        try {
            const authToken = sessionStorage.getItem('authToken');
            const response = await axios.post('http://localhost:8080/api/events/create', eventData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            alert('Event created successfully!');
        } catch (error) {
            console.error('Failed to create event:', error);
            alert('Failed to create the event. Please try again.');
        }
    };

    return (
        <div>
            <TopPanel />
            <div className="favorite-header">
                <h2>Create New Event</h2>
            </div>
            <div className="container_change">
                <div className="login-container">
                    <form className="register" onSubmit={handleSubmit}>
                        <input 
                            className="iconpassword" 
                            name="title" 
                            type="text" 
                            placeholder="Event Title" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input 
                            className="iconpassword" 
                            name="date" 
                            type="datetime-local" 
                            placeholder="Event Date" 
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                        <input 
                            className="iconpassword" 
                            name="place" 
                            type="text" 
                            placeholder="Event Location" 
                            value={place}
                            onChange={e => setPlace(e.target.value)}
                        />
                        <select
                            className="iconpassword"
                            name="category"
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <input 
                            className="iconpassword" 
                            name="description" 
                            placeholder="Event Description" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <input 
                            className="iconpassword" 
                            name="photo" 
                            type="text" 
                            placeholder="Photo URL" 
                            value={photo}
                            onChange={e => setPhoto(e.target.value)}
                        />
                        <button className="btn" type="submit">Create Event</button>
                    </form>
                </div>
            </div>
            <BottomPanel />
        </div>
    );
}

export default CreateEventPage;
