// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const message = document.getElementById("message")

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/todos');
        } catch (error) {
            message.textContent = "Informations de connexion invalide !"
            setTimeout(() => {
                message.textContent = ""
            }, 3000)
            console.error("Error logging in: ", error.message);
        }
    };

    return (
        <div className='Login'>
            <h2 className='h2'>Login</h2>
            <p id="message"></p>
            <form onSubmit={handleLogin}>
                <input className="for-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="for-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="for-submit" type="submit">Login</button>
            </form>
            <h3 className='h3'>Nouveau ? <Link to="/register" className='link'>Inscrivez-vous</Link></h3>
        </div>
    );
};

export default Login;
