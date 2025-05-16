import React from 'react';
import { useNavigate } from 'react-router-dom';

function MedicalCenterCard({ hospital }) {
    const navigate = useNavigate();

    // Defensive check: Ensure hospital is defined
    if (!hospital) {
        return <div>No hospital data available</div>;
    }

    const handleBookingClick = () => {
        navigate(`/booking?hospital=${encodeURIComponent(hospital.name)}`);
    };

    return (
        <div className="medical-center-card">
            <h3>{hospital.name}</h3> {/* Updated from hospital['Hospital Name'] */}
            <p>{hospital.address}, {hospital.city}, {hospital.state} {hospital.zip}</p>
            <p>Type: {hospital.type}</p>
            <p>Rating: {hospital.rating}/5</p>
            <button onClick={handleBookingClick}>
                Book FREE Center Visit
            </button>
        </div>
    );
}

export default MedicalCenterCard;