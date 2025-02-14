import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

function Event({ name, description, price, nbTickets: initialTickets, nbParticipants: initialParticipants, img }) {
    const [nbTickets, setNbTickets] = useState(initialTickets);
    const [nbParticipants, setNbParticipants] = useState(initialParticipants);
    const [like, setLike] = useState(false);
    const [showBookingMessage, setShowBookingMessage] = useState(false);

    const handleBooking = () => {
        if (nbTickets > 0) {
            setNbTickets(prev => prev - 1);
            setNbParticipants(prev => prev + 1);
            setShowBookingMessage(true);
            setTimeout(() => {
                setShowBookingMessage(false);
            }, 2000);
        }
    };

    const handleLike = () => {
        setLike(!like);
    };

    return (
        <Card className="event-card">
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
                        <h3>{name}</h3>
                        <p>{description}</p>
                    </div>
                </div>
                {like && (
                    <div className="like-badge">
                        <i className="bi bi-heart-fill"></i>
                    </div>
                )}
            </div>
            
            <Card.Body>
                <Card.Title className="event-title">
                    {name}
                    <Button 
                        variant="link"
                        onClick={handleLike}
                        className={`like-button-small ${like ? 'liked' : ''}`}
                    >
                        <i className={`bi ${like ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </Button>
                </Card.Title>
                
                <div className="event-details">
                    <div className="detail-item">
                        <span className="detail-label">
                            <i className="bi bi-tag-fill"></i> Prix
                        </span>
                        <span className="detail-value price">{price} DT</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">
                            <i className="bi bi-ticket-perforated-fill"></i> Tickets
                        </span>
                        <span className="detail-value tickets" data-available={nbTickets > 0}>
                            {nbTickets}
                        </span>
                    </div>
                    <div className="detail-item">
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
                    className="book-button"
                >
                    <i className="bi bi-calendar-check me-2"></i>
                    {nbTickets > 0 ? "Réserver maintenant" : "Complet"}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Event;
