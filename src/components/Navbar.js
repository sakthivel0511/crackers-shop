import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="logo-area">
        <img src="/images/logo.png" alt="Logo" />
        <h1>Srivi Crackers</h1>
      </div>
      <div className="hamburger" onClick={toggleMenu}>☰</div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;