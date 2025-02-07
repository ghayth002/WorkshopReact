import { useState } from 'react'
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterC from './components/CounterC'
import CounterF from './components/CounterF'
import ListManager from './components/ListManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <Header />
          <CounterC counter={10}/>
          <CounterF initialCount={0} step={1}/>
          <ListManager 
            initialItems={['React', 'Angular', 'VueJs']} 
            placeholder="Entrez un nouveau framework..."
          />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
