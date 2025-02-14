import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../events.json';

function Events() {
    const [showWelcome, setShowWelcome] = useState(false);
    const [events, setEvents] = useState(eventsData.events);

    // Cycle de vie - Montage
    useEffect(() => {
        console.log("Composant Events monté");
        setShowWelcome(true);

        // Message de bienvenue disparaît après 3 secondes
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);

        // Cycle de vie - Démontage
        return () => {
            console.log("Composant Events va être démonté");
            clearTimeout(timer);
        };
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'au montage

    // Cycle de vie - Mise à jour
    useEffect(() => {
        console.log("Les événements ont été mis à jour");
    }, [events]); // S'exécute chaque fois que events change

    return (
        <Container className="mt-4">
            {showWelcome && (
                <Alert variant="info" className="text-center">
                    Bienvenue à nos événements! 🎉
                </Alert>
            )}
            
            <h2 className="text-center mb-4">Liste des événements</h2>
            <Row>
                {events.map((event, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Event {...event} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Events;
