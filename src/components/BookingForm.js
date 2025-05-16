import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingForm({ center }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigate = useNavigate();

    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
    }

    const timeSlots = {
        Morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
        Afternoon: ['1:00 PM', '2:00 PM', '3:00 PM'],
        Evening: ['5:00 PM', '6:00 PM', '7:00 PM'],
    };

    const handleBook = () => {
        if (selectedDate && selectedTime) {
            const booking = {
                hospitalName: center['Hospital Name'],
                address: center.Address,
                city: center.City,
                state: center.State,
                zip: center['ZIP Code'],
                date: selectedDate,
                time: selectedTime,
            };

            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            navigate('/my-bookings');
        }
    };

    return (
        <div className="booking-form">
            <h2>{center['Hospital Name']}</h2>
            <div>
                <label>Select Date</label>
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                >
                    <option value="">Select a date</option>
                    {dates.map(date => (
                        <option key={date} value={date}>
                            {new Date(date).toLocaleDateString()}
                        </option>
                    ))}
                </select>
            </div>
            {selectedDate && Object.keys(timeSlots).map(period => (
                <div key={period} className="time-slots">
                    <p>{period}</p>
                    <div className="time-buttons">
                        {timeSlots[period].map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={selectedTime === time ? 'active' : ''}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button
                onClick={handleBook}
                className="confirm"
                disabled={!selectedDate || !selectedTime}
            >
                Confirm Booking
            </button>
        </div>
    );
}

export default BookingForm;