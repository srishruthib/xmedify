import React from 'react';

function MedicalCenterCard({ hospital, onBook }) {
    return (
        <div className="hospital-card">
            <h3>{hospital.name}</h3>
            <p>{hospital.address}</p>
            <p>
                {hospital.city}, {hospital.state} {hospital.zip}
            </p>
            <p>Type: {hospital.type}</p>
            <p>Rating: {hospital.rating}</p>
            <button onClick={onBook}>Book</button>
        </div>
    );
}

export default MedicalCenterCard;
