import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';
import Header from '../../Components/Header';

export default function Chat() {
    // filters
    
    const [filterDate, setFilterDate] = useState('');
    const [filterUsername, setFilterUsername] = useState('');
    const [filterOrder, setFilterOrder] = useState('asc');
    
    // filters
    const [order, setOrder] = useState('desc');
    const [userUsername, setUserUsername] = useState('');
    const [filters, setFilters] = useState({
        filterOrder: 'a',
        filterUsername: '',
        filterDate: '',
    });

    const [messageContent, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ioClient = io.connect("http://10.0.0.108:3333");

    // user data
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.post(`messages`, {filterDate, filterUsername, filterOrder})
            .then(response => {
                setMessages(response.data);
            });
    }, []);

    useEffect(() => {
        ioClient.on('chat new message', (msg) => {
            api.post('messages', {filterDate, filterUsername, filterOrder})
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
        api.post(`messages`, {filterDate, filterUsername, filterOrder})
        .then(response => {
            setMessages(response.data);
        });

    }, [filterDate, filterUsername, filterOrder]);

    return (
        <div className="container">

            <input type="date" onChange={e => setFilterDate(e.target.value)}></input>
            <input type="text" onChange={e => setFilterUsername(e.target.value)} placeholder="Username"></input>
            {filterOrder == 'asc'
                ? <button type="button" onClick={e => setFilterOrder(e.target.value)} value='desc'>Crescente</button>
                : <button type="button" onClick={e => setFilterOrder(e.target.value)} value='asc'>Decrescente</button>
            }
            
            <div className="chat-box">
                <Header handleFilters order={order} userUsername={userUsername} />
                <section className="chat-messages" id="chat-messages">
                    {messages.map((message) => (
                        <ul key={message._id}>
                            <li><strong>{message.userUsername}</strong> - {message.content}</li>
                        </ul>
                    ))}
                </section>

                <section className="form">
                    <strong>{username}</strong>
                    <form onSubmit={handleMessage}>
                        <input
                            placeholder="Digite algo..."
                            value={messageContent}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button className="button" type="submit">Enviar</button>
                    </form>
                </section>
            </div>
        </div>
    );
};