import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.scss';

export default function Login() {
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const response = await api.post('users/login', { username });
            history.push('/logon');

            if (response.data) {
                alert('Usuário existente, tente novamente!')
            } else {
                await api.post('users/insert', { username, userType });
                history.push('/');
            }


        } catch (err) {
            alert('Algo deu errado, tente novamente!')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <h1 className="openchat-title">OpenChat</h1>
                <form onSubmit={handleLogon}>
                    <h1>Crie seu usuário</h1>
                    {/* <div>
                        <input type="radio" value="1" name="gender" onChange={e => { setUserType(e.target.value) }} /> User
                        <input type="radio" value="2" name="gender" onChange={e => { setUserType(e.target.value) }} /> Admin
                    </div> */}

                    <input
                        placeholder="Usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <button className="button" type="submit">Criar</button>
                </form>
            </section>
        </div>
    );
};