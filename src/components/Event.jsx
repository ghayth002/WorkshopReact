import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

function Event({ name, description, price, nbTickets: initialTickets, nbParticipants: initialParticipants, img }) {
    const [nbTickets, setNbTickets] = useState(initialTickets);
    const [nbParticipants, setNbParticipants] = useState(initialParticipants);
    const [like, setLike] = useState(false);
    const [showBookingMessage, setShowBookingMessage] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
    const [showSparkle, setShowSparkle] = useState(false);

    useEffect(() => {
        if (showBookingMessage) {
            setTimeout(() => {
                setShowBookingMessage(false);
            }, 2000);
        }
    }, [showBookingMessage]);

    const handleBooking = () => {
        if (nbTickets > 0) {
            setNbTickets(prev => prev - 1);
            setNbParticipants(prev => prev + 1);
            setShowBookingMessage(true);
            
            // Trigger confetti effect
            const confetti = document.createElement('div');
            confetti.className = 'confetti-container';
            document.body.appendChild(confetti);
            setTimeout(() => document.body.removeChild(confetti), 2000);
        }
    };

    const handleLike = () => {
        setLike(!like);
        if (!like) {
            // Create heart burst effect
            const burst = document.createElement('div');
            burst.className = 'heart-burst';
            document.body.appendChild(burst);
            setTimeout(() => document.body.removeChild(burst), 1000);
        }
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSparklePosition({ x, y });
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 200);
    };

    return (
        <Card 
            className={`event-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {showSparkle && (
                <div 
                    className="sparkle"
                    style={{
                        left: sparklePosition.x,
                        top: sparklePosition.y
                    }}
                />
            )}
            <div className="event-image-container">
                <Card.Img 
                    variant="top" 
                    src={img}
                    className="event-image"
                    alt={name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(name);
                    }}
                />
                <div className="event-overlay">
                    <div className="event-overlay-content">
                        <h3 className="glow-text">{name}</h3>
                        <p>{description}</p>
                    </div>
                </div>
                {like && (
                    <div className="like-badge pulse">
                        <i className="bi bi-heart-fill"></i>
                    </div>
                )}
            </div>
            
            <Card.Body className="card-content">
                <Card.Title className="event-title">
                    <span className="title-text">{name}</span>
                    <Button 
                        variant="link"
                        onClick={handleLike}
                        className={`like-button-small ${like ? 'liked' : ''}`}
                    >
                        <i className={`bi ${like ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </Button>
                </Card.Title>
                
                <div className="event-details">
                    <div className="detail-item shine-effect">
                        <span className="detail-label">
                            <i className="bi bi-tag-fill"></i> Prix
                        </span>
                        <span className="detail-value price">{price} DT</span>
                    </div>
                    <div className="detail-item shine-effect">
                        <span className="detail-label">
                            <i className="bi bi-ticket-perforated-fill"></i> Tickets
                        </span>
                        <span className={`detail-value tickets ${nbTickets === 0 ? 'sold-out' : ''}`} data-available={nbTickets > 0}>
                            {nbTickets}
                        </span>
                    </div>
                    <div className="detail-item shine-effect">
                        <span className="detail-label">
                            <i className="bi bi-people-fill"></i> Participants
                        </span>
                        <span className="detail-value participants">{nbParticipants}</span>
                    </div>
                </div>
                
                {showBookingMessage && (
                    <Alert variant="success" className="booking-alert">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Réservation effectuée avec succès!
                    </Alert>
                )}
                
                <Button 
                    variant="primary"
                    onClick={handleBooking}
                    disabled={nbTickets === 0}
                    className={`book-button ${nbTickets === 0 ? 'sold-out' : ''}`}
                >
                    <i className="bi bi-calendar-check me-2"></i>
                    {nbTickets > 0 ? "Réserver maintenant" : "Complet"}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Event;
