import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { FaMoneyBillWave, FaTicketAlt, FaUsers, FaCalendarAlt, FaClock } from 'react-icons/fa';

function Event({ name, description, price, nbTickets: initialTickets, nbParticipants: initialParticipants, img, date, time }) {
    const [nbTickets, setNbTickets] = useState(initialTickets);
    const [nbParticipants, setNbParticipants] = useState(initialParticipants);
    const [liked, setLiked] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setIsBooking(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleLike = (event) => {
        event.preventDefault();
        setLiked(!liked);
        if (!liked && cardRef.current) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            
            // Create a container for the heart
            const heartContainer = document.createElement('div');
            heartContainer.className = 'heart-container';
            heartContainer.appendChild(heart);
            
            cardRef.current.appendChild(heartContainer);
            
            setTimeout(() => {
                if (heartContainer.parentNode) {
                    heartContainer.parentNode.removeChild(heartContainer);
                }
            }, 1000);
        }
    };

    const book = () => {
        if (nbTickets > 0) {
            setIsBooking(true);
            setTimeout(() => {
                setNbTickets(prev => prev - 1);
                setNbParticipants(prev => prev + 1);
                setShowSuccess(true);
                createConfetti();
            }, 500);
        }
    };

    const createConfetti = () => {
        if (!cardRef.current) return;
        
        const confettiContainer = cardRef.current.querySelector('.confetti-container');
        if (!confettiContainer) return;

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
            confettiContainer.appendChild(confetti);
            setTimeout(() => confettiContainer.removeChild(confetti), 2000);
        }
    };

    return (
        <div className="modern-card" ref={cardRef}>
            <div className="card-header">
                <img 
                    src={img} 
                    alt={name}
                    onError={(e) => {
                        e.target.src = `https://source.unsplash.com/800x600/?event,${encodeURIComponent(name)}`;
                    }}
                />
                <button 
                    className={`like-btn ${liked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    ♥
                </button>
            </div>
            
            <div className="card-content">
                <h2>{name}</h2>
                <div className="event-meta">
                    <div className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{date}</span>
                    </div>
                    <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>{time}</span>
                    </div>
                </div>
                <p className="description">{description}</p>
                
                <div className="stats">
                    <div className="stat">
                        <div className="stat-icon">
                            <FaMoneyBillWave />
                        </div>
                        <div className="stat-content">
                            <span className="value">{price}</span>
                            <span className="label">DT</span>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-icon">
                            <FaTicketAlt />
                        </div>
                        <div className="stat-content">
                            <span className="value">{nbTickets}</span>
                            <span className="label">Tickets</span>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-icon">
                            <FaUsers />
                        </div>
                        <div className="stat-content">
                            <span className="value">{nbParticipants}</span>
                            <span className="label">Participants</span>
                        </div>
                    </div>
                </div>

                <button 
                    className={`book-btn ${isBooking ? 'booking' : ''} ${nbTickets === 0 ? 'sold-out' : ''}`}
                    onClick={book}
                    disabled={nbTickets === 0 || isBooking}
                >
                    {nbTickets === 0 ? 'Sold Out' : isBooking ? 'Booking...' : 'Book Now'}
                </button>

                {showSuccess && (
                    <div className="success-alert">
                        <div className="success-icon">✓</div>
                        <div className="success-text">Booked Successfully!</div>
                    </div>
                )}
                <div className="confetti-container"></div>
            </div>
        </div>
    );
}

export default Event;
