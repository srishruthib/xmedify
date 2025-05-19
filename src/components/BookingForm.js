import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const center = location.state?.center;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
    });

    if (!center) {
        return <div>No center selected. Please go back and try again.</div>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push({
            ...formData,
            hospitalName: center.name,
            address: center.address,
            city: center.city,
            state: center.state,
            zip: center.zip,
        });
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert("Booking Confirmed!");
        navigate('/my-bookings');
    };

    return (
        <div className="booking-form">
            <h2>{center.name}</h2>
            <p>{center.address}, {center.city}, {center.state} {center.zip}</p>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );
}

export default BookingForm;
