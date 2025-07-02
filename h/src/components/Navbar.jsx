import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => (
  <nav className="navbar">
    <div className="logo">INFINITO 2025 CA PAGE</div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/perks">Perks</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/register" className="btn">Register</Link></li>
    </ul>
  </nav>
);

export default Navbar;