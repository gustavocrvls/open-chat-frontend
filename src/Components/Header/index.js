import React, { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';

import AdminTools from '../AdminTools';


import api from '../../services/api';

import './styles.css';

export default function Header(props) {
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');

    return (
        <header>
            <span className="header-title">Open Chat</span><br/>
            <span className="header-username">logado como: {username}</span>

            <span><button type="button"><FiLogOut></FiLogOut></button></span>
            {userType == 2 &&
                <AdminTools {...props}/>
            }
        </header>
    )
}