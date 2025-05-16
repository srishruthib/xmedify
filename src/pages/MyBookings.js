import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';

function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className="container">
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid">
                    {bookings.map((booking, index) => (
                        <BookingCard key={index} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;