import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TreeDetail from './pages/TreeDetail';
import WateringForm from './pages/WateringForm';
import Navigation from './components/Navigation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tree/:treeId" element={<TreeDetail />} />
        <Route path="/visit/:treeId" element={<WateringForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;