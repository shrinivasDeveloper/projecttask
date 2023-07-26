import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${username}`);
      const data = response.data;

      const character = data.results[0];

      if (character.birth_year === password || password === 'unknown') {
        console.log('Login successful');
        history('/planet'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error');
      console.error(error);
    }
  };

  return (
    <div className='flex-container'>
      <form onSubmit={handleLogin}>
        <div className="flex">
          <h1>Star War</h1>
          <label className='label-login' htmlFor="username">Name </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="flex">
          <label className='label-password' htmlFor="password">Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
