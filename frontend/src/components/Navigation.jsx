import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>🌳 Tree Watering App</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
      <div className="nav-user">
        <span>{user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navigation;