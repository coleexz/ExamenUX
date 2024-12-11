import React from 'react'
import { useState } from 'react';
import './css/Restaurants.css';

const RestaurantCard = ({ restaurant }) => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');

    const handleAvailabilityClick = () => {
        setShowAvailability(!showAvailability);
    };

    const handleReserveClick = () => {
        console.log(`Reserving at ${selectedTime} for ${name}`);
    };

    return (
        <div className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <button onClick={handleAvailabilityClick}>
                {showAvailability ? 'Ocultar disponibilidad' : 'Ver disponibilidad'}
            </button>
            {showAvailability && (
                <div className="availability">
                    <h4>Horarios disponibles</h4>
                    {restaurant.availableTimes.map((time) => (
                        <div key={time}>
                            <input
                                type="checkbox"
                                value={time}
                                checked={selectedTime === time}
                                onChange={() => setSelectedTime(time)}
                            />
                            <label>{time}</label>
                        </div>
                    ))}
                    <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleReserveClick}>Reservar</button>
                </div>
            )}
        </div>
    );
};

export default RestaurantCard;
