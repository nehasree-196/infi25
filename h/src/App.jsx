import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Perks from './pages/Perks';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Register from './pages/Register';
import DashboardLayout from './pages/DashboardLayout'; 
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
// import Bookings from './pages/Bookings';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/perks" element={<Perks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} /> {/* default = profile */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<ChangePassword />} />
          {/* <Route path="bookings" element={<Bookings />} />  */}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;


