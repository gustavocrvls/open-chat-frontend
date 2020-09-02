import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(20);
    const history = useHistory();
    const ioClient = io.connect("http://10.0.0.108:3333");

    // const userId = localS

    useEffect(() => {
        api.get('messages', {})
            .then(response => {
                setMessages(response.data);
            });
    }, []);

    useEffect(() => {
        ioClient.on('chat new message', (msg) => {
            api.get('messages', {})
            .then(response => {
                setMessages(response.data);
            });
        })
    })

    async function handleMessage(e) {
        e.preventDefault();

        try {
            await api.post('messages/insert', { content: message, userUsername: 'adsd', userId: 'hues' });
            ioClient.emit('chat new message');
        } catch (err) {
            alert('Falha no envio da mensagem, tente novamente!');
        }
    }

    return (
        <div className="chat-container">
            {messages.map((message) => (
                <li>
                    {message.content}
                </li>
            ))}
            <section className="form">
                <form onSubmit={handleMessage}>
                    <input
                        placeholder="Digite algo..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button className="button" type="submit">Enviar</button>
                </form>
            </section>
        </div>
    );
};