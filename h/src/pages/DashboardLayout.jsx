import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  function logout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>

        <NavLink to="profile" className="sidebar-link">Profile</NavLink>
        <NavLink to="change-password" className="sidebar-link">Change Password</NavLink>
        <NavLink to="bookings" className="sidebar-link">Bookings</NavLink>

        {role === 'ca' && (
          <NavLink to="/ca-dashboard" className="sidebar-link">CA Dashboard</NavLink>
        )}

        {(role === 'admin' || role === 'moderator') && (
          <NavLink to="/admin-dashboard" className="sidebar-link">Admin Dashboard</NavLink>
        )}

        <button onClick={logout} className="logout-button">Logout</button>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;