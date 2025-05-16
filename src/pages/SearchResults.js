import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MedicalCenterCard from '../components/MedicalCenterCard';
import BookingForm from '../components/BookingForm';

function SearchResults() {
    const [centers, setCenters] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const state = params.get('state');
    const city = params.get('city');
    const selectedHospital = params.get('hospital');

    useEffect(() => {
        if (state && city) {
            fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
                .then(res => res.json())
                .then(data => setCenters(data))
                .catch(err => console.error('Error fetching medical centers:', err));
        }
    }, [state, city]);

    const selectedCenter = centers.find(center => center['Hospital Name'] === selectedHospital);

    return (
        <div className="container">
            {!selectedHospital ? (
                <>
                    <h1>{centers.length} medical centers available in {city}</h1>
                    <div className="grid">
                        {centers.map(center => (
                            <MedicalCenterCard key={center['Hospital Name']} center={center} />
                        ))}
                    </div>
                </>
            ) : (
                <BookingForm center={selectedCenter} />
            )}
        </div>
    );
}

export default SearchResults;