import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.scss';
import Header from '../../Components/Header';
import AdminTools from '../../Components/AdminTools';
import { FiSend } from 'react-icons/fi';

export default function Chat() {
    const [filterDate, setFilterDate] = useState('');
    const [filterUsername, setFilterUsername] = useState('');
    const [filterOrder, setFilterOrder] = useState('asc');

    const [messageContent, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ioClient = io.connect("http://10.0.0.108:3333");

    // user data
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.post(`messages`, { filterDate, filterUsername, filterOrder })
            .then(response => {
                setMessages(response.data);
            });
    }, []);

    useEffect(() => {
        ioClient.on('chat new message', (msg) => {
            api.post('messages', { filterDate, filterUsername, filterOrder })
                .then(response => {
                    setMessages(response.data);
                });
        })
    })

    useEffect(() => {
        var objDiv = document.getElementById("chat-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    })

    async function handleMessage(e) {
        e.preventDefault();

        try {
            await api.post('messages/insert', { content: messageContent, userUsername: username, userId: userId });
            ioClient.emit('chat new message');
            setMessage('');
        } catch (err) {
            alert('Falha no envio da mensagem, tente novamente!');
        }
    }


    useEffect(() => {
        api.post(`messages`, { filterDate, filterUsername, filterOrder })
            .then(response => {
                setMessages(response.data);
            });

    }, [filterDate, filterUsername, filterOrder]);

    return (
        <div className="container">


            <div className="chat-box">
                <Header>
                    <AdminTools>
                        <span className="admin--filter-title">Filtros: </span>
                        <span className="form-control">
                            <label htmlFor="filterDate">Data:</label>
                            <input type="date" onChange={e => setFilterDate(e.target.value)} id="filterDate"></input>
                        </span>
                        <span className="form-control">
                            <label htmlFor="filterUsername">Username:</label>
                            <input type="text" onChange={e => setFilterUsername(e.target.value)} placeholder="Username" id="filterUsername"></input>
                        </span>
                        <span className="form-control">
                            <label htmlFor="filterOrder">Ordem:</label>
                            {filterOrder == 'asc'
                                ? <button type="button" onClick={e => setFilterOrder(e.target.value)} value='desc' id="filterOrder" className="admin--btn">Crescente</button>
                                : <button type="button" onClick={e => setFilterOrder(e.target.value)} value='asc' id="filterOrder" className="admin--btn">Decrescente</button>
                            }
                        </span>
                    </AdminTools>
                </Header>
                <section className="chat-messages" id="chat-messages">
                    {messages.map((message) => (
                        <ul key={message._id}>
                            <li><strong>{message.userUsername}</strong> - {message.content}</li>
                        </ul>
                    ))}
                </section>

                <section className="form">
                    <div><strong>{username}</strong></div>
                    <form onSubmit={handleMessage}>
                        <input
                            placeholder="Digite algo..."
                            value={messageContent}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button className="btn-chat" type="submit"><FiSend></FiSend></button>
                    </form>
                </section>
            </div>
        </div>
    );
};