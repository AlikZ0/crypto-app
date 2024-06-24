import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Registered';
import CryptoCalculator from './components/cryptoCalculator/CryptoCalculator';
import './App.css';  // Импортируем общий CSS-файл

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/app" element={<CryptoCalculator/>} />
      </Routes>
    </Router>
  );
}

export default App;
