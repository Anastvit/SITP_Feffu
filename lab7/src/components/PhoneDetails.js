import React, { useState } from 'react';
import './PhoneDetails.css';
import InteractiveForm from './InteractiveForm';

const PhoneDetails = ({ phone }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`phone-details ${phone.position}`}>
            <img src={phone.image} alt={phone.name} />
            <div className={`text-${phone.position}`}>
                <h4>{phone.name}</h4>
                <p className="description">{phone.description}</p>
                <ul style={{ display: isExpanded ? 'block' : 'none' }}>
                    {phone.specs.map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
            </div>
            <div className="button-form-container">
                <button onClick={toggleExpansion} className="expand-button">
                    {isExpanded ? '-' : '+'}
                </button>
                {isExpanded && <InteractiveForm />}
            </div>
        </div>
    );
};

export default PhoneDetails;
