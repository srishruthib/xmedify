import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
    // Hardcoded states and cities to bypass API delays
    const [states] = useState(['Alabama', 'Alaska']);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Simulate fetching cities based on selected state
    const handleStateChange = (state) => {
        setSelectedState(state);
        setIsStateDropdownOpen(false);
        // Hardcoded cities for Alabama and Alaska
        if (state === 'Alabama') {
            setCities(['Dothan', 'Montgomery']);
        } else if (state === 'Alaska') {
            setCities(['Anchorage', 'Fairbanks']);
        } else {
            setCities([]);
        }
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsCityDropdownOpen(false);
    };

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
                    <div
                        className="dropdown-toggle"
                        onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                    >
                        {selectedState || 'Select a state'}
                    </div>
                    <ul className={`dropdown-menu ${isStateDropdownOpen ? 'visible' : ''}`}>
                        {states.length > 0 ? (
                            states.map(state => (
                                <li
                                    key={state}
                                    onClick={() => handleStateChange(state)}
                                    className="dropdown-item"
                                >
                                    {state}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">No states available</li>
                        )}
                    </ul>
                </div>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <div id="city">
                    <div
                        className="dropdown-toggle"
                        onClick={() => selectedState && setIsCityDropdownOpen(!isCityDropdownOpen)}
                    >
                        {selectedCity || 'Select a city'}
                    </div>
                    <ul className={`dropdown-menu ${isCityDropdownOpen ? 'visible' : ''}`}>
                        {cities.length > 0 ? (
                            cities.map(city => (
                                <li
                                    key={city}
                                    onClick={() => handleCitySelect(city)}
                                    className="dropdown-item"
                                >
                                    {city}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">
                                {selectedState ? 'No cities available' : 'Select a state first'}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <button type="submit" id="searchBtn" disabled={!selectedState || !selectedCity}>
                Search
            </button>
        </form>
    );
}

export default SearchForm;