import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Admin from './pages/Admin'; 

import './App.css';
import OrderForm from './pages/order-form';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-form" element={<OrderForm/>}/>
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;