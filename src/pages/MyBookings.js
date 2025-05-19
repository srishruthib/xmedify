import React from 'react';
import BookingCard from '../components/BookingCard';

function MyBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (bookings.length === 0) {
        return <div>No bookings found.</div>;
    }

    return (
        <div className="my-bookings">
            <h2>My Bookings</h2>
            {bookings.map((booking, index) => (
                <BookingCard key={index} booking={booking} />
            ))}
        </div>
    );
}

export default MyBookings;

