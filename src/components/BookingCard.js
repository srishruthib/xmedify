import React from 'react';

function BookingCard({ booking }) {
    if (!booking || !booking.hospital) {
        return <div>No booking data available</div>;
    }

    const { hospital, patientName, date } = booking;

    return (
        <div className="booking-card">
            <h3>{hospital.name}</h3>
            <p>{hospital.address}</p>
            <p>
                {hospital.city}, {hospital.state} {hospital.zip}
            </p>
            <p>Type: {hospital.type}</p>
            <p>Rating: {hospital.rating}</p>
            <p>Patient: {patientName}</p>
            <p>Date: {date}</p>
        </div>
    );
}

export default BookingCard;
