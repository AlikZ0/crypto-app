import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './regisstered.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    try {
      // Сохранение email и пароля в Local Storage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      alert('Регистрация прошла успешно!');
      goToLogin(); // Перенаправление на страницу входа
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };
 const goToLogin =()=>{
  navigate('/login')
 };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={goToLogin}>Login</button>
        <button type="submit" to='/login'>Register</button>
      </form>
    </div>
  );
};

export default Register;
