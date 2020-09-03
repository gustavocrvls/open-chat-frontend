import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.scss';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('users/login', { username });

      console.log(response.data);

      localStorage.setItem('userId', response.data._id);
      localStorage.setItem('username', username);
      localStorage.setItem('userType', response.data.userType);

      history.push('/chat');

    } catch (err) {
      alert('Falha no login, tente novamente!')
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <h1 className="openchat-title">OpenChat</h1>
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          {/* <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link> */}
        </form>
      </section>
    </div>
  );
};