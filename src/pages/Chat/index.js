import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

export default function Chat() {
    const [messageContent, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(20);
    const history = useHistory();
    const ioClient = io.connect("http://10.0.0.108:3333");
    
    // user data
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('messages', {})
            .then(response => {
                setMessages(response.data.reverse());
            });
    }, []);

    useEffect(() => {
        ioClient.on('chat new message', (msg) => {
            api.get('messages', {})
            .then(response => {
                setMessages(response.data.reverse());
            });
        })
    })

    useEffect(() => {
        var objDiv = document.getElementById("chat-messages");
        console.log(objDiv);
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

    return (
        <div className="chat-box">
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
    );
};