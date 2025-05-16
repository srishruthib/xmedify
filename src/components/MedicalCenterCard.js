import React from 'react';
import { useNavigate } from 'react-router-dom';

function MedicalCenterCard({ center }) {
    const navigate = useNavigate();

    const handleBook = () => {
        navigate(`/search?state=${center.State}&city=${center.City}&hospital=${encodeURIComponent(center['Hospital Name'])}`);
    };

    return (
        <div className="medical-center-card">
            <h3>{center['Hospital Name']}</h3>
            <p>{center.Address}, {center.City}, {center.State} {center['ZIP Code']}</p>
            <p>Rating: {center['Overall Rating']}</p>
            <button onClick={handleBook}>Book FREE Center Visit</button>
        </div>
    );
}

export default MedicalCenterCard;