import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MedicalCenterCard from '../components/MedicalCenterCard';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');

    const query = new URLSearchParams(location.search);
    const state = query.get('state');
    const city = query.get('city');

    useEffect(() => {
        if (!state || !city) {
            navigate('/');
            return;
        }

        // Mock data
        const mockHospitals = [
            {
                name: 'Southeast Alabama Medical Center',
                address: '1108 Ross Clark Circle',
                city: 'Dothan',
                state: 'Alabama',
                zip: '36301',
                type: 'Acute Care',
                rating: 4,
            },
            {
                name: 'Flowers Hospital',
                address: '4370 West Main Street',
                city: 'Dothan',
                state: 'Alabama',
                zip: '36305',
                type: 'Acute Care',
                rating: 3,
            },
        ];

        const filteredHospitals = mockHospitals.filter(
            (hospital) => hospital.state === state && hospital.city === city
        );

        setHospitals(filteredHospitals);
        setLoading(false);
    }, [state, city, navigate]);

    const handleBookClick = (hospital) => {
        setSelectedHospital(hospital);
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();

        const newBooking = {
            hospital: selectedHospital,
            patientName,
            date,
        };

        const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        existingBookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));

        alert('Booking successful!');
        navigate('/my-bookings');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>
                {hospitals.length} medical centers available in {city}
            </h1>
            <div className="grid">
                {hospitals.map((hospital) => (
                    <MedicalCenterCard
                        key={hospital.name}
                        hospital={hospital}
                        onBook={() => handleBookClick(hospital)}
                    />
                ))}
            </div>

            {selectedHospital && (
                <div className="booking-form">
                    <h2>Book Appointment at {selectedHospital.name}</h2>
                    <form onSubmit={handleBookingSubmit}>
                        <div>
                            <label htmlFor="patientName">Patient Name:</label>
                            <input
                                id="patientName"
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Date:</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Confirm Booking</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
