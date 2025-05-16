import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://meddata-backend.onrender.com/states')
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error('Error fetching states:', err));
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
                .then(res => res.json())
                .then(data => setCities(data))
                .catch(err => console.error('Error fetching cities:', err));
        }
    }, [selectedState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedState && selectedCity) {
            navigate(`/search?state=${selectedState}&city=${selectedCity}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div>
                <label htmlFor="state">State</label>
                <div id="state">
                    <select
                        id="state-select"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        required
                    >
                        <option value="">Select a state</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <div id="city">
                    <select
                        id="city-select"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                        disabled={!selectedState}
                    >
                        <option value="">Select a city</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit" id="searchBtn">Search</button>
        </form>
    );
}

export default SearchForm;