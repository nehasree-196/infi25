import React from 'react';

const Register = () => (
  <section className="section">
    <h2>Register as Campus Ambassador</h2>
    <form className="register-form">
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="text" placeholder="College Name" required />
      <input type="tel" placeholder="Phone Number" required />
      <input type="text" placeholder="City" required />
      <button type="submit">Register</button>
    </form>
  </section>
);

export default Register;