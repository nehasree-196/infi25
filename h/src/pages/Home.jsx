import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Become the Face of FestName</h1>
      <p>Join the Campus Ambassador Program and represent us at your college!</p>
      <Link to="/register" className="cta-button">Join Now</Link>
    </div>
  </section>
);

export default Home;