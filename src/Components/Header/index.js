import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import AdminTools from '../AdminTools';


import api from '../../services/api';

import './styles.scss';

export default function Header(props) {
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
    const history = useHistory();

    useEffect(() => {
        if (!username) {
            alert('Você precisa logar primeiro!');
            history.push('/');
        }
    })

    function logOut(params) {
        localStorage.clear();
        history.push('/');
    }

    return (
        <header>
            <div className="header-title">OpenChat</div>
            <div className="header-login-box">
                <span>logado como: <span className="header-username">{username}</span></span>
                {props.children}
                <span><button type="button" onClick={logOut} title="Sair" className="header-button"><FiLogOut></FiLogOut></button></span>
            </div>
        </header>
    )
}