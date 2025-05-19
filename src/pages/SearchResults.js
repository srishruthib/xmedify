import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MedicalCenterCard from '../components/MedicalCenterCard';

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = new URLSearchParams(location.search);
    const state = query.get('state');
    const city = query.get('city');

    useEffect(() => {
        if (!state || !city) {
            navigate('/');
            return;
        }

        // Mock hospital data instead of fetching from API
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

        // Filter mock data based on state and city
        const filteredHospitals = mockHospitals.filter(
            hospital => hospital.state === state && hospital.city === city
        );

        setHospitals(filteredHospitals);
        setLoading(false);
    }, [state, city, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>
                {hospitals.length} medical centers available in {city}
            </h1>
            <div className="grid">
                {hospitals.map(hospital => (
                    <MedicalCenterCard key={hospital.name} hospital={hospital} />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;