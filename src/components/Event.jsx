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
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img 
                variant="top" 
                src={`/${img}`}
                style={{ height: '200px', objectFit: 'cover' }} 
                alt={name}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(name);
                }}
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>
                    Prix: {price} DT
                    <br />
                    Nombre de tickets: {nbTickets}
                    <br />
                    Nombre de participants: {nbParticipants}
                </Card.Text>
                <div className="d-flex justify-content-between mb-2">
                    <Button 
                        variant={like ? "danger" : "outline-danger"}
                        onClick={handleLike}
                    >
                        {like ? "Dislike ❌" : "Like ❤️"}
                    </Button>
                    <Button 
                        variant="success" 
                        onClick={handleBooking}
                        disabled={nbTickets === 0}
                    >
                        {nbTickets === 0 ? "Sold Out" : "Book an event"}
                    </Button>
                </div>
                {showBookingMessage && (
                    <Alert variant="success" className="mt-2">
                        You have booked an event!
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}

export default Event;
