import React from 'react';

function BookingCard({ booking }) {
    return (
        <div className="booking-card">
            <h3>{booking.hospitalName}</h3>
            <p>{booking.address}, {booking.city}, {booking.state} {booking.zip}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p>Time: {booking.time}</p>
        </div>
    );
}

export default BookingCard;