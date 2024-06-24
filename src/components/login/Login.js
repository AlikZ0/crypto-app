import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (email === storedEmail && password === storedPassword) {
        alert('Вход выполнен успешно!');
        navigate('/app'); // Перенаправление на главную страницу
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };
  const goToRegister =()=>{
    navigate('/')
   };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <button type="submit" onClick={goToRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
