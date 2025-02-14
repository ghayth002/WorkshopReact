import React from 'react';
import Event from './components/Event';
import './App.css';

const events = [
  {
    name: "Summer Music Festival",
    description: "Join us for an unforgettable evening of live music under the stars. Featuring top artists and amazing performances!",
    price: 120,
    nbTickets: 200,
    nbParticipants: 150,
    img: "https://source.unsplash.com/800x600/?concert",
    date: "15 Jul 2025",
    time: "18:00"
  },
  {
    name: "Tech Conference 2025",
    description: "Explore the future of technology with industry leaders. Workshops, keynotes, and networking opportunities!",
    price: 250,
    nbTickets: 100,
    nbParticipants: 80,
    img: "https://source.unsplash.com/800x600/?technology",
    date: "20 Aug 2025",
    time: "09:00"
  },
  {
    name: "Food & Wine Expo",
    description: "Taste exquisite cuisines and fine wines from around the world. Meet celebrity chefs and discover new flavors!",
    price: 150,
    nbTickets: 150,
    nbParticipants: 100,
    img: "https://source.unsplash.com/800x600/?food",
    date: "10 Sep 2025",
    time: "19:00"
  }
];

function App() {
  return (
    <div className="App">
      <div className="cards-container">
        {events.map((event, index) => (
          <Event
            key={index}
            name={event.name}
            description={event.description}
            price={event.price}
            nbTickets={event.nbTickets}
            nbParticipants={event.nbParticipants}
            img={event.img}
            date={event.date}
            time={event.time}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
